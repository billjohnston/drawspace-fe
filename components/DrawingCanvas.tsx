import { FunctionComponent, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { useDrawCanvasDispatch } from 'logic/useDrawCanvas'

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
        touchAction: 'none',
    },
    tmpCanvas: {
        touchAction: 'none',
        position: 'absolute',
    },
}))

const DrawingCanvas: FunctionComponent = () => {
    const classes = useStyles()
    const canvasRef = useRef<HTMLCanvasElement>()
    const tmpCanvasRef = useRef<HTMLCanvasElement>()

    const {
        initCanvas,
        initTmpCanvas,
        startStroke,
        drawStroke,
        endStroke,
    } = useDrawCanvasDispatch()

    useEffect(() => {
        initTmpCanvas(tmpCanvasRef.current)
        initCanvas(canvasRef.current)
    }, [])

    return (
        <div className={classes.canvasWrapper}>
            <Paper className={classes.paper} elevation={2}>
                <canvas className={classes.canvas} ref={canvasRef} />
                <canvas
                    className={classes.tmpCanvas}
                    onMouseDown={startStroke}
                    onMouseMove={drawStroke}
                    onMouseUp={endStroke}
                    onTouchStart={startStroke}
                    onTouchMove={drawStroke}
                    onTouchEnd={endStroke}
                    onMouseLeave={endStroke}
                    ref={tmpCanvasRef}
                />
            </Paper>
        </div>
    )
}

export default DrawingCanvas
