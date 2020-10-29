import { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import PaletteIcon from '@material-ui/icons/Palette'
import BrushIcon from '@material-ui/icons/Brush'
import SaveIcon from '@material-ui/icons/Save'

const useStyles = makeStyles({
    toolbarWrapper: {
        display: 'flex',
    },
})

const DrawingToolbar: FunctionComponent = () => {
    const classes = useStyles()

    return (
        <div>
            <IconButton aria-label="Color">
                <PaletteIcon />
            </IconButton>
            <IconButton aria-label="Brush">
                <BrushIcon />
            </IconButton>
            <IconButton aria-label="Save">
                <SaveIcon />
            </IconButton>
        </div>
    )
}

export default DrawingToolbar
