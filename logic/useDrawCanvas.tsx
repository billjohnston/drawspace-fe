import {
    FunctionComponent,
    createContext,
    useContext,
    useRef,
    MouseEvent,
    TouchEvent,
    useState,
} from 'react'
import { Coords, DrawStack, Color, Brush } from 'types'
import {
    initCanvas,
    brushes,
    redraw,
    createThumbnail,
} from 'logic/utilCanvasOperations'

type MouseOrTouchEvent =
    | MouseEvent<HTMLCanvasElement>
    | TouchEvent<HTMLCanvasElement>

interface DrawCanvasState {
    activeColor?: Color
    activeBrush?: Brush
    activeLineWidth?: number
    canUndo?: boolean
    canRedo?: boolean
}

interface DrawCanvasDispatch {
    initCanvases?: (
        canvasEl: HTMLCanvasElement,
        tmpCanvasEl: HTMLCanvasElement
    ) => void
    startStroke?: (e: MouseOrTouchEvent) => void
    drawStroke?: (e: MouseOrTouchEvent) => void
    endStroke?: (e: MouseOrTouchEvent) => void
    setBrush?: (brush: Brush) => void
    setColor?: (color: Color) => void
    setLineWidth?: (width: number) => void
    undo?: () => void
    redo?: () => void
    getDrawingInfo: () => Promise<{
        drawStack: DrawStack[]
        thumbnailBlob: Blob
        startTime: string
        width: number
        height: number
        resolution: number
    }>
}

const DrawCanvasStateContext = createContext<DrawCanvasState>({})
const DrawCanvasDispatchContext = createContext<DrawCanvasDispatch>({})

const xyPosFromEvent = (e: MouseOrTouchEvent): Coords => {
    const { pageX, pageY } = e.nativeEvent
    const xPos = pageX - e.target.parentElement.offsetLeft
    const yPos = pageY - e.target.parentElement.offsetTop
    return { x: xPos, y: yPos }
}

const DrawCanvasProvider: FunctionComponent = ({ children }) => {
    const contextRef = useRef<CanvasRenderingContext2D>()
    const tmpContextRef = useRef<CanvasRenderingContext2D>()

    const [brush, setBrush] = useState<Brush>(Brush.PENCIL)
    const [color, setColor] = useState<Color>(Color.BLACK)
    const [lineWidth, setLineWidth] = useState<number>(10)
    const [canUndo, setCanUndo] = useState<boolean>(false)
    const [canRedo, setCanRedo] = useState<boolean>(false)

    const drawStackRef = useRef<DrawStack[]>([])
    const startTimeRef = useRef<string>()
    const redoStackRef = useRef<DrawStack[]>([])
    const strokeRef = useRef<DrawStack>()

    const isMouseDown = useRef<boolean>(false)

    const state = {
        activeBrush: brush,
        activeColor: color,
        activeLineWidth: lineWidth,
        canUndo,
        canRedo,
    }

    const dispatch = {
        setBrush,
        setColor,
        setLineWidth,
        undo: () => {
            if (!drawStackRef.current.length) {
                return
            }
            const stackItem = drawStackRef.current.pop()
            redoStackRef.current.push(stackItem)
            if (!canRedo) {
                setCanRedo(true)
            }
            if (!drawStackRef.current.length) {
                setCanUndo(false)
            }
            redraw(
                contextRef.current,
                tmpContextRef.current,
                drawStackRef.current
            )
        },
        redo: () => {
            if (!redoStackRef.current.length) {
                return
            }
            const stackItem = redoStackRef.current.pop()
            drawStackRef.current.push(stackItem)
            if (!canUndo) {
                setCanUndo(true)
            }
            if (!redoStackRef.current.length) {
                setCanRedo(false)
            }
            redraw(
                contextRef.current,
                tmpContextRef.current,
                drawStackRef.current
            )
        },
        initCanvases: (
            canvasEl: HTMLCanvasElement,
            tmpCanvasEl: HTMLCanvasElement
        ): void => {
            const [ctx, tmpCtx] = initCanvas(canvasEl, tmpCanvasEl)
            contextRef.current = ctx
            tmpContextRef.current = tmpCtx
        },
        startStroke: (e: MouseOrTouchEvent) => {
            e.preventDefault()
            isMouseDown.current = true
            const coords = xyPosFromEvent(e)
            strokeRef.current = {
                brush,
                color,
                lineWidth,
                points: [coords],
            }
            brushes[brush].startStroke(tmpContextRef.current, lineWidth, color)
        },
        drawStroke: (e: MouseOrTouchEvent) => {
            e.preventDefault()
            if (!isMouseDown.current) {
                return
            }
            const coords = xyPosFromEvent(e)
            strokeRef.current.points.push(coords)
            brushes[brush].drawStroke(
                tmpContextRef.current,
                strokeRef.current.points
            )
        },
        endStroke: (e: MouseOrTouchEvent) => {
            e.preventDefault()
            if (strokeRef.current) {
                drawStackRef.current.push(strokeRef.current)
                if (drawStackRef.current.length === 1) {
                    startTimeRef.current = new Date().toISOString()
                }
                if (!canUndo) {
                    setCanUndo(true)
                }
            }

            brushes[brush].endStroke(
                contextRef.current,
                tmpContextRef.current,
                strokeRef.current ? strokeRef.current.points : []
            )

            strokeRef.current = null
            isMouseDown.current = false
            redoStackRef.current = []
            if (canRedo) {
                setCanRedo(false)
            }
        },
        getDrawingInfo: async () => {
            const thumbnailBlob = await createThumbnail(contextRef.current, 300)
            return {
                drawStack: drawStackRef.current,
                startTime: startTimeRef.current,
                thumbnailBlob,
                width: contextRef.current.canvas.width,
                height: contextRef.current.canvas.height,
                resolution: devicePixelRatio,
            }
        },
    }
    return (
        <DrawCanvasStateContext.Provider value={state}>
            <DrawCanvasDispatchContext.Provider value={dispatch}>
                {children}
            </DrawCanvasDispatchContext.Provider>
        </DrawCanvasStateContext.Provider>
    )
}

const useDrawCanvasState = (): DrawCanvasState => {
    const context = useContext(DrawCanvasStateContext)
    if (context === undefined) {
        throw new Error(
            'useDrawCanvasState must be used within a DrawCanvasProvider'
        )
    }
    return context
}

const useDrawCanvasDispatch = (): DrawCanvasDispatch => {
    const context = useContext(DrawCanvasDispatchContext)
    if (context === undefined) {
        throw new Error(
            'useDrawCanvasDispatch must be used within a DrawCanvasProvider'
        )
    }
    return context
}

export { DrawCanvasProvider, useDrawCanvasState, useDrawCanvasDispatch }
