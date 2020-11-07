import {
    forwardRef,
    ForwardRefRenderFunction,
    MouseEventHandler,
    TouchEventHandler,
    useImperativeHandle,
    useRef,
} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import clsx from 'clsx'

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
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    noTouch: {
        touchAction: 'none',
    },
}))

interface Props {
    onMouseDown?: MouseEventHandler
    onMouseMove?: MouseEventHandler
    onMouseUp?: MouseEventHandler
    onMouseLeave?: MouseEventHandler
    onTouchStart?: TouchEventHandler
    onTouchMove?: TouchEventHandler
    onTouchEnd?: TouchEventHandler
    allowTouch?: boolean
}
const FullSizeCanvas: ForwardRefRenderFunction<
    { canvas: HTMLCanvasElement; tmpCanvas: HTMLCanvasElement },
    Props
> = (
    {
        onMouseDown,
        onMouseMove,
        onMouseUp,
        onMouseLeave,
        onTouchStart,
        onTouchMove,
        onTouchEnd,
        allowTouch,
    },
    ref
) => {
    const classes = useStyles()
    const canvasRef = useRef<HTMLCanvasElement>()
    const tmpCanvasRef = useRef<HTMLCanvasElement>()

    useImperativeHandle(ref, () => ({
        canvas: canvasRef.current,
        tmpCanvas: tmpCanvasRef.current,
    }))

    const handleDisableContext = (e) => {
        e.preventDefault()
    }

    return (
        <div className={classes.canvasWrapper}>
            <Paper className={classes.paper} elevation={3}>
                <canvas ref={canvasRef} className={classes.canvas} />
                <canvas
                    className={clsx(classes.tmpCanvas, {
                        [classes.noTouch]: !allowTouch,
                    })}
                    ref={tmpCanvasRef}
                    onContextMenu={handleDisableContext}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseLeave}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                />
            </Paper>
        </div>
    )
}

export default forwardRef(FullSizeCanvas)
