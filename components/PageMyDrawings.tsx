import { FunctionComponent } from 'react'
import Box from '@material-ui/core/Box'
import Head from 'next/head'
import { appName } from 'logic/envVars'

const PageMyDrawings: FunctionComponent = () => {
    return (
        <>
            <Head>
                <title>My Drawings | {appName}</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <Box
                display="flex"
                flex={1}
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                MY DRAWINGS
            </Box>
        </>
    )
}

export default PageMyDrawings
