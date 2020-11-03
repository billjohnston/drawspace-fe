import { FunctionComponent } from 'react'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import SaveDrawingDialog from 'components/SaveDrawingDialog'
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

    return (
        <div className={classes.brushControlWrapper}>
            <SaveDrawingDialog>
                {({ canSave, handleSave }) => (
                    <Button
                        variant="outlined"
                        disabled={Boolean(!canSave)}
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                )}
            </SaveDrawingDialog>
        </div>
    )
}

export default ControlSave
