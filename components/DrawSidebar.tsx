import { FunctionComponent } from 'react'
import Drawer from '@material-ui/core/Drawer'
import { makeStyles } from '@material-ui/core/styles'
import ControlColor from 'components/ControlColor'
import ControlLineWidth from 'components/ControlLineWidth'
import ControlBrush from 'components/ControlBrush'
import ControlUndo from 'components/ControlUndo'

const useStyles = makeStyles({
    drawer: {
        width: 200,
    },
    drawerContent: {
        width: 200,
    },
})

const DrawSidebar: FunctionComponent = () => {
    const classes = useStyles()
    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open
        >
            <div className={classes.drawerContent}>
                <ControlColor />
                <ControlLineWidth />
                <ControlBrush />
                <ControlUndo />
            </div>
        </Drawer>
    )
}

export default DrawSidebar
