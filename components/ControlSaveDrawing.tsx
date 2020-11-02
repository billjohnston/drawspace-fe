import { FunctionComponent, useState } from 'react'
import { useDrawCanvasState, useDrawCanvasDispatch } from 'logic/useDrawCanvas'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import FormSaveDrawingDialog from 'components/FormSaveDrawingDialog'
import { queryCache } from 'react-query'
import { currentDrawing } from 'logic/utilQueryKeys'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    brushControlWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

const ControlSave: FunctionComponent = () => {
    const classes = useStyles()
    const { canUndo: canSave } = useDrawCanvasState()
    const { getDrawingInfo } = useDrawCanvasDispatch()
    const [saveDialogOpen, setSaveDialogOpen] = useState(false)

    const openSaveDialog = () => {
        setSaveDialogOpen(true)
    }
    const closeSaveDialog = () => {
        setSaveDialogOpen(false)
    }

    const handleSave = async () => {
        const drawingInfo = await getDrawingInfo()
        queryCache.setQueryData(currentDrawing, drawingInfo)
        openSaveDialog()
    }

    return (
        <div className={classes.brushControlWrapper}>
            <Button
                variant="outlined"
                disabled={Boolean(!canSave)}
                startIcon={<SaveIcon />}
                onClick={handleSave}
            >
                Save
            </Button>
            <FormSaveDrawingDialog
                open={saveDialogOpen}
                setOpen={openSaveDialog}
                setClosed={closeSaveDialog}
            />
        </div>
    )
}

export default ControlSave
