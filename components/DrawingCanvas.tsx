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
    const canvasRef = useRef<HTMLCanvasElement>()
    const tmpCanvasRef = useRef<HTMLCanvasElement>()

    const {
        initCanvases,
        startStroke,
        drawStroke,
        endStroke,
    } = useDrawCanvasDispatch()

    useEffect(() => {
        setTimeout(() => {
            initCanvases(canvasRef.current, tmpCanvasRef.current)
        })
    }, [])

    const handleDisableContext = (e) => {
        e.preventDefault()
    }

    return (
        <div className={classes.canvasWrapper}>
            <Paper className={classes.paper} elevation={3}>
                <canvas ref={canvasRef} className={classes.canvas} />
                <canvas
                    className={classes.tmpCanvas}
                    onMouseDown={startStroke}
                    onMouseMove={drawStroke}
                    onMouseUp={endStroke}
                    onTouchStart={startStroke}
                    onTouchMove={drawStroke}
                    onTouchEnd={endStroke}
                    onMouseLeave={endStroke}
                    onContextMenu={handleDisableContext}
                    ref={tmpCanvasRef}
                />
            </Paper>
        </div>
    )
}

export default DrawingCanvas
