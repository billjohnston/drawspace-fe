import { FunctionComponent, useEffect, useRef } from 'react'
import useQueryDrawSteps from 'logic/useQueryDrawSteps'
import Canvas from 'components/Canvas'
import { initCanvas, redraw, slowlyRedraw } from 'logic/utilCanvasOperations'
import Button from '@material-ui/core/Button'

interface Props {
    drawStepsUrl: string
    width: number
    height: number
}
const DrawingDisplay: FunctionComponent<Props> = ({
    drawStepsUrl,
    width,
    height,
}) => {
    const { data: drawSteps, isLoading, isIdle } = useQueryDrawSteps(
        drawStepsUrl
    )
    const canvasRef = useRef<{
        canvas: HTMLCanvasElement
        tmpCanvas: HTMLCanvasElement
    }>()

    useEffect(() => {
        setTimeout(() => {
            if (canvasRef.current) {
                const { canvas, tmpCanvas } = canvasRef.current
                const scaledWidth = canvas.offsetWidth
                const scale = scaledWidth / width
                const scaledHeight = (scaledWidth * height) / width
                const [ctx, tmpCtx] = initCanvas(
                    canvas,
                    tmpCanvas,
                    scaledWidth,
                    scaledHeight
                )
                redraw(ctx, tmpCtx, drawSteps, scale)
            }
        })
    }, [drawSteps])

    const handleRedraw = () => {
        const { canvas, tmpCanvas } = canvasRef.current
        const scaledWidth = canvas.offsetWidth
        const scale = scaledWidth / width
        const scaledHeight = (scaledWidth * height) / width
        const [ctx, tmpCtx] = initCanvas(
            canvas,
            tmpCanvas,
            scaledWidth,
            scaledHeight
        )
        slowlyRedraw(ctx, tmpCtx, drawSteps, scale)
    }
    return (
        <div>
            {!isLoading && !isIdle && <Canvas ref={canvasRef} />}
            <Button variant="contained" onClick={handleRedraw}>
                Redraw!
            </Button>
        </div>
    )
}

export default DrawingDisplay
