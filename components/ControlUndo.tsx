import { FunctionComponent, MouseEvent } from 'react'
import { useDrawCanvasState, useDrawCanvasDispatch } from 'logic/useDrawCanvas'
import Button from '@material-ui/core/Button'
import UndoIcon from '@material-ui/icons/Undo'
import RedoIcon from '@material-ui/icons/Redo'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    brushControlWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

const ControlUndo: FunctionComponent = () => {
    const classes = useStyles()
    // const { activeBrush } = useDrawCanvasState()
    const { undo, redo } = useDrawCanvasDispatch()

    // const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    //     undo()
    // }

    return (
        <div className={classes.brushControlWrapper}>
            <Button
                variant="outlined"
                startIcon={<UndoIcon />}
                onClick={undo}
            >
                Undo
            </Button>
            <Button
                variant="outlined"
                startIcon={<RedoIcon />}
                onClick={redo}
            >
                Redo
            </Button>
        </div>
    )
}

export default ControlUndo
