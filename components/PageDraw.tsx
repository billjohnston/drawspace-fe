import { FunctionComponent } from 'react'
import DrawingCanvas from 'components/DrawingCanvas'
import { makeStyles } from '@material-ui/core/styles'
import { DrawCanvasProvider } from 'logic/useDrawCanvas'
import DrawSidebar from 'components/DrawSidebar'
import Head from 'next/head'
import { appName } from 'logic/envVars'

const useStyles = makeStyles({
    pageWrapper: {
        display: 'flex',
        flex: 1,
    },
    canvasArea: {},
})

const PageDraw: FunctionComponent = () => {
    const classes = useStyles()
    return (
        <>
            <Head>
                <title>Draw | {appName}</title>
            </Head>
            <div className={classes.pageWrapper}>
                <DrawCanvasProvider>
                    <DrawSidebar />
                    <DrawingCanvas />
                </DrawCanvasProvider>
            </div>
        </>
    )
}

export default PageDraw
