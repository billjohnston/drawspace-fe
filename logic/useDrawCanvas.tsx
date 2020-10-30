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
import { initCanvas, brushes, redraw } from 'logic/canvasOperations'

interface DrawCanvasState {
    activeColor?: Color
    activeBrush?: Brush
    activeLineWidth?: number
}

type MouseOrTouchEvent =
    | MouseEvent<HTMLCanvasElement>
    | TouchEvent<HTMLCanvasElement>

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
    const [lineWidth, setLineWidth] = useState<number>(6)

    const drawStackRef = useRef<DrawStack[]>([])
    const redoStackRef = useRef<DrawStack[]>([])
    const strokeRef = useRef<DrawStack>()

    const isMouseDown = useRef<boolean>(false)

    const state = {
        activeBrush: brush,
        activeColor: color,
        activeLineWidth: lineWidth,
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
            contextRef.current = initCanvas(canvasEl)
            tmpContextRef.current = initCanvas(tmpCanvasEl)
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
            }
            strokeRef.current = null
            isMouseDown.current = false
            brushes[brush].endStroke(contextRef.current, tmpContextRef.current)
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
