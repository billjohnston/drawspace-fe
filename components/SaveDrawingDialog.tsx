import { FunctionComponent, useState, ReactNode } from 'react'
import { useDrawCanvasState, useDrawCanvasDispatch } from 'logic/useDrawCanvas'
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

interface Props {
    children: (args: { canSave: boolean; handleSave: () => void }) => ReactNode
}
const ControlSave: FunctionComponent<Props> = ({ children }) => {
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
            {children({ canSave, handleSave })}
            <FormSaveDrawingDialog
                open={saveDialogOpen}
                setOpen={openSaveDialog}
                setClosed={closeSaveDialog}
            />
        </div>
    )
}

export default ControlSave
