import { FunctionComponent, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import BrushIcon from '@material-ui/icons/Brush'
import { appName } from 'logic/envVars'
import FormLoginDialog from 'components/FormLoginDialog'
import Link from 'next/link'

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
    const [loginDialogOpen, setLoginDialogOpen] = useState(false)

    const openLoginDialog = () => {
        setLoginDialogOpen(true)
    }
    const closeLoginDialog = () => {
        setLoginDialogOpen(false)
    }
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <BrushIcon />
                    <Typography variant="h6" className={classes.title}>
                        {appName}
                    </Typography>
                    {/* <Link href="/">
                        <Button color="inherit">Public Drawings</Button>
                    </Link>
                    <Link href="/draw">
                        <Button color="inherit">Create Drawing</Button>
                    </Link> */}
                    {isFetching ? null : isAuthenticated ? (
                        <div>:D</div>
                    ) : (
                        <Button
                            color="inherit"
                            onClick={openLoginDialog}
                            aria-label="Login / Sign Up"
                        >
                            Login / Sign Up
                        </Button>
                    )}
                    <FormLoginDialog
                        open={loginDialogOpen}
                        setOpen={openLoginDialog}
                        setClosed={closeLoginDialog}
                    />
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navigation
