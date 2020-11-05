import { FunctionComponent, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDrawCanvasDispatch } from 'logic/useDrawCanvas'
import Canvas from 'components/Canvas'

const useStyles = makeStyles(({ spacing }) => ({
    canvasWrapper: {
        display: 'flex',
        flex: 1,
        padding: spacing(1),
    },
    paper: {
        display: 'flex',
        flex: 1,
        position: 'relative',
    },
    canvas: {
        width: '100%',
        height: '100%',
    },
    tmpCanvas: {
        touchAction: 'none',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
}))

const DrawingCanvas: FunctionComponent = () => {
    const classes = useStyles()
    const canvasRef = useRef<{
        canvas: HTMLCanvasElement
        tmpCanvas: HTMLCanvasElement
    }>()

    const {
        initCanvases,
        startStroke,
        drawStroke,
        endStroke,
    } = useDrawCanvasDispatch()

    useEffect(() => {
        // wait for correct offsetWidth/height
        setTimeout(() => {
            initCanvases(canvasRef.current.canvas, canvasRef.current.tmpCanvas)
        })
    }, [])

    return (
        <div className={classes.canvasWrapper}>
            <Canvas
                ref={canvasRef}
                onMouseDown={startStroke}
                onMouseMove={drawStroke}
                onMouseUp={endStroke}
                // @ts-ignore
                onTouchStart={startStroke}
                // @ts-ignore
                onTouchMove={drawStroke}
                // @ts-ignore
                onTouchEnd={endStroke}
                onMouseLeave={endStroke}
            />
        </div>
    )
}

export default DrawingCanvas
