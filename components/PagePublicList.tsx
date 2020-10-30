import { FunctionComponent } from 'react'
import Box from '@material-ui/core/Box'
import Head from 'next/head'
import { appName } from 'logic/envVars'

const PagePublicList: FunctionComponent = () => {
    return (
        <>
            <Head>
                <title>New Drawings | {appName}</title>
            </Head>
            <Box
                display="flex"
                flex={1}
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                PUBLIC LIST
            </Box>
        </>
    )
}

export default PagePublicList
