import { FunctionComponent } from 'react'
import Head from 'next/head'
import { appName } from 'logic/envVars'
import useQueryDrawingDetail from 'logic/useQueryDrawingDetail'
import { useRouter } from 'next/router'
import FullScreenPage from 'components/FullScreenPage'
import Typography from '@material-ui/core/Typography'
import Skeleton from '@material-ui/lab/Skeleton'
import PageError from 'components/PageError'
import Container from 'components/Container'
import DrawingDisplay from 'components/DrawingDisplay'

const PageMyDrawings: FunctionComponent = () => {
    const router = useRouter()
    const { id: drawingId }: { id?: string } = router.query
    const { data, isLoading, isIdle, error } = useQueryDrawingDetail(drawingId)
    const waiting = isLoading || isIdle
    if (error) {
        return <PageError error={error.message} />
    }
    return (
        <>
            <Head>
                <title>Drawing Detail | {appName}</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <FullScreenPage>
                <Container>
                    <div>
                        <div>
                            {waiting ? (
                                <Typography variant="h5">
                                    <Skeleton />
                                </Typography>
                            ) : (
                                <Typography variant="h5">
                                    {data.title}
                                </Typography>
                            )}
                        </div>
                        <div>
                            {waiting ? (
                                <Skeleton
                                    variant="rect"
                                    width="100%"
                                    height={400}
                                />
                            ) : (
                                <DrawingDisplay
                                    drawStepsUrl={data.drawStepsUrl}
                                    width={data.width}
                                    height={data.height}
                                    resolution={data.resolution}
                                />
                            )}
                        </div>
                    </div>
                </Container>
            </FullScreenPage>
        </>
    )
}

export default PageMyDrawings
