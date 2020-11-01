import { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import BrushIcon from '@material-ui/icons/Brush'
import { appName } from 'logic/envVars'
import FormLoginDialog from 'components/FormLoginDialog'
import useQueryIsAuthenticated from 'logic/useQueryIsAuthenticated'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        zIndex: theme.zIndex.drawer + 1,
        position: 'relative',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}))

const Navigation: FunctionComponent = () => {
    const classes = useStyles()
    const { data: isAuthenticated, isFetching } = useQueryIsAuthenticated()
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <BrushIcon />
                    <Typography variant="h6" className={classes.title}>
                        {appName}
                    </Typography>
                    {isFetching ? null : isAuthenticated ? (
                        <div>:D</div>
                    ) : (
                        <FormLoginDialog />
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navigation
