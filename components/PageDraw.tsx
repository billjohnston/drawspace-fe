import { FunctionComponent } from 'react'
import DrawingCanvas from 'components/DrawingCanvas'
import { DrawCanvasProvider } from 'logic/useDrawCanvas'
import DrawSidebar from 'components/DrawSidebar'
import FullScreenPage from 'components/FullScreenPage'
import Head from 'next/head'
import { appName } from 'logic/envVars'

const PageDraw: FunctionComponent = () => {
    return (
        <>
            <Head>
                <title>Draw | {appName}</title>
            </Head>
            <FullScreenPage>
                <DrawCanvasProvider>
                    <DrawSidebar />
                    <DrawingCanvas />
                </DrawCanvasProvider>
            </FullScreenPage>
        </>
    )
}

export default PageDraw
