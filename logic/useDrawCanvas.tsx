import {
    FunctionComponent,
    createContext,
    useContext,
    useRef,
    MouseEvent,
    TouchEvent,
    useState,
} from 'react'
import { Coords, DrawStep, Color, Brush } from 'types'

interface DrawCanvasState {
    activeColor: Color
    activeBrush: Brush
    activeLineWidth: number
}

type MouseOrTouchEvent =
    | MouseEvent<HTMLCanvasElement>
    | TouchEvent<HTMLCanvasElement>

interface DrawCanvasDispatch {
    initCanvas?: (canvasEl: HTMLCanvasElement) => void
    initTmpCanvas?: (canvasEl: HTMLCanvasElement) => void
    startStroke?: (e: MouseOrTouchEvent) => void
    drawStroke?: (e: MouseOrTouchEvent) => void
    endStroke?: (e: MouseOrTouchEvent) => void
    setBrush?: (brush: Brush) => void
    setColor?: (color: Color) => void
    setLineWidth?: (width: number) => void
}

const DrawCanvasStateContext = createContext<DrawCanvasState>({})
const DrawCanvasDispatchContext = createContext<DrawCanvasDispatch>({})

const xyPosFromEvent = (e: MouseOrTouchEvent) => {
    const { pageX, pageY } = e.nativeEvent
    const xPos = pageX - e.target.parentElement.offsetLeft
    const yPos = pageY - e.target.parentElement.offsetTop
    return [xPos, yPos]
}

const midPointBtw = (
    p1: { x: number; y: number },
    p2: { x: number; y: number }
) => {
    return {
        x: p1.x + (p2.x - p1.x) / 2,
        y: p1.y + (p2.y - p1.y) / 2,
    }
}

const DrawCanvasProvider: FunctionComponent = ({ children }) => {
    const canvasRef = useRef<HTMLCanvasElement>()
    const contextRef = useRef<CanvasRenderingContext2D>()
    const tmpCanvasRef = useRef<HTMLCanvasElement>()
    const tmpContextRef = useRef<CanvasRenderingContext2D>()

    const [brush, setBrush] = useState<Brush>(Brush.PENCIL)
    const [color, setColor] = useState<Color>(Color.BLACK)
    const [lineWidth, setLineWidth] = useState<number>(5)

    const drawPointsRef = useRef<Coords[]>([])
    const drawStepsRef = useRef<DrawStep[]>([])

    const isMouseDown = useRef<boolean>(false)

    const state = {
        activeBrush: brush,
        activeColor: color,
        activeLineWidth: lineWidth,
    }

    const commonEndStroke = () => {
        // if (drawPointsRef.current.length) {
        //     drawStepsRef.current.push({
        //         // color: tmpCanvasCtx.strokeStyle,
        //         points: drawPointsRef.current,
        //     })
        // }

        drawPointsRef.current = []
        isMouseDown.current = false
        contextRef.current.drawImage(
            tmpCanvasRef.current,
            0,
            0,
            canvasRef.current.width * devicePixelRatio,
            canvasRef.current.height * devicePixelRatio,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
        )
        // Clearing tmp canvas
        tmpContextRef.current.clearRect(
            0,
            0,
            tmpCanvasRef.current.width,
            tmpCanvasRef.current.height
        )
    }

    const brushes = {
        [Brush.PENCIL]: {
            startStroke: (e: MouseOrTouchEvent) => {
                const [xPos, yPos] = xyPosFromEvent(e)
                drawPointsRef.current.push({ x: xPos, y: yPos })
                tmpContextRef.current.lineWidth = lineWidth
                tmpContextRef.current.strokeStyle = color
                tmpContextRef.current.lineCap = 'round'
                tmpContextRef.current.lineJoin = 'round'
                tmpContextRef.current.globalCompositeOperation = 'source-over'
                isMouseDown.current = true
            },
            drawStroke: (e: MouseOrTouchEvent) => {
                const [xPos, yPos] = xyPosFromEvent(e)
                drawPointsRef.current.push({ x: xPos, y: yPos })

                tmpContextRef.current.clearRect(
                    0,
                    0,
                    tmpContextRef.current.canvas.width,
                    tmpContextRef.current.canvas.height
                )

                let p1 = drawPointsRef.current[0]
                let p2 = drawPointsRef.current[1]

                tmpContextRef.current.beginPath()
                tmpContextRef.current.moveTo(p1.x, p1.y)
                drawPointsRef.current.forEach((x, i) => {
                    const midPoint = midPointBtw(p1, p2)
                    tmpContextRef.current.quadraticCurveTo(
                        p1.x,
                        p1.y,
                        midPoint.x,
                        midPoint.y
                    )
                    p1 = drawPointsRef.current[i]
                    p2 = drawPointsRef.current[i + 1]
                })

                tmpContextRef.current.lineTo(p1.x, p1.y)
                tmpContextRef.current.stroke()
            },
            endStroke: commonEndStroke,
        },
    }

    const dispatch = {
        setBrush,
        setColor,
        setLineWidth,
        initCanvas: (canvasEl: HTMLCanvasElement): void => {
            /* eslint-disable no-param-reassign */
            canvasEl.style.width = `${canvasEl.parentElement.offsetWidth}px`
            canvasEl.style.height = `${canvasEl.parentElement.offsetHeight}px`
            canvasEl.width =
                canvasEl.parentElement.offsetWidth * devicePixelRatio
            canvasEl.height =
                canvasEl.parentElement.offsetHeight * devicePixelRatio
            /* eslint-enable */

            const context = canvasEl.getContext('2d')
            context.scale(devicePixelRatio, devicePixelRatio)
            context.fillStyle = '#ffffff'
            // context.fillRect(0, 0, canvasEl.width, canvasEl.height)
            canvasRef.current = canvasEl
            contextRef.current = context
        },
        initTmpCanvas: (canvasEl: HTMLCanvasElement): void => {
            /* eslint-disable no-param-reassign */
            canvasEl.style.width = `${canvasEl.parentElement.offsetWidth}px`
            canvasEl.style.height = `${canvasEl.parentElement.offsetHeight}px`
            canvasEl.width =
                canvasEl.parentElement.offsetWidth * devicePixelRatio
            canvasEl.height =
                canvasEl.parentElement.offsetHeight * devicePixelRatio
            /* eslint-enable */

            const context = canvasEl.getContext('2d')
            context.scale(devicePixelRatio, devicePixelRatio)
            tmpCanvasRef.current = canvasEl
            tmpContextRef.current = context
        },
        startStroke: (e: MouseOrTouchEvent) => {
            e.preventDefault()
            brushes[brush].startStroke(e)
        },
        drawStroke: (e: MouseOrTouchEvent) => {
            e.preventDefault()
            if (!isMouseDown.current) {
                return
            }
            brushes[brush].drawStroke(e)
        },
        endStroke: (e: MouseOrTouchEvent) => {
            e.preventDefault()
            brushes[brush].endStroke()
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
