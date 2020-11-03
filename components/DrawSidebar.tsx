import { FunctionComponent } from 'react'
import Drawer from '@material-ui/core/Drawer'
import { makeStyles } from '@material-ui/core/styles'
import ControlColor from 'components/ControlColor'
import ControlLineWidth from 'components/ControlLineWidth'
import ControlBrush from 'components/ControlBrush'
import ControlUndo from 'components/ControlUndo'
import ControlSaveDrawing from 'components/ControlSaveDrawing'

const useStyles = makeStyles(({ spacing }) => ({
    drawer: {
        width: 200,
    },
    drawerContent: {
        width: 200,
        padding: spacing(2),
        display: 'flex',
        flexDirection: 'column',
    },
}))

const DrawSidebar: FunctionComponent = () => {
    const classes = useStyles()
    return (
        <div className={classes.drawerContent}>
            <ControlColor />
            <ControlLineWidth />
            <ControlBrush />
            <ControlUndo />
            <ControlSaveDrawing />
        </div>
    )
}

export default DrawSidebar
