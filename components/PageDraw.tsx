import { FunctionComponent } from 'react'
import DrawingCanvas from 'components/DrawingCanvas'
import { DrawCanvasProvider } from 'logic/useDrawCanvas'
import DrawSidebar from 'components/DrawSidebar'
import FullScreenPage from 'components/FullScreenPage'
import Head from 'next/head'
import Hidden from '@material-ui/core/Hidden'
import { appName } from 'logic/envVars'
import DrawingBottomNav from 'components/DrawingBottomNav'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(({ breakpoints }) => ({
    wrapper: {
        display: 'flex',
        flex: 1,
    },
    [breakpoints.only('xs')]: {
        wrapper: {
            flexDirection: 'column',
        },
    },
    [breakpoints.up('sm')]: {
        wrapper: {
            flexDirection: 'row',
        },
    },
}))

const PageDraw: FunctionComponent = () => {
    const classes = useStyles()
    return (
        <>
            <Head>
                <title>Draw | {appName}</title>
            </Head>
            <FullScreenPage>
                <div className={classes.wrapper}>
                    <DrawCanvasProvider>
                        <Hidden only="xs">
                            <DrawSidebar />
                        </Hidden>
                        <DrawingCanvas />
                        <Hidden smUp>
                            <DrawingBottomNav />
                        </Hidden>
                    </DrawCanvasProvider>
                </div>
            </FullScreenPage>
        </>
    )
}

export default PageDraw
