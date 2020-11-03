import { FunctionComponent } from 'react'
import Head from 'next/head'
import { appName } from 'logic/envVars'
import FullScreenPage from 'components/FullScreenPage'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Skeleton from '@material-ui/lab/Skeleton'
import PageError from 'components/PageError'
import Container from 'components/Container'
import useQueryPublicDrawings from 'logic/useQueryPublicDrawings'
import DrawingCard from 'components/DrawingCard'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
    gridWrapper: {
        display: 'grid',
        gridGap: spacing(1),
        gridAutoRows: '1fr',
        '&:before': {
            content: "''",
            width: 0,
            paddingBottom: '100%',
            gridRow: '1 / 1',
            gridColumn: '1 / 1',
        },
        '& > :first-child': {
            gridRow: '1 / 1',
            gridColumn: '1 / 1',
        },
    },
    [breakpoints.up('sm')]: {
        gridWrapper: {
            gridTemplateColumns: 'repeat(3, 1fr)',
        },
    },
    [breakpoints.only('xs')]: {
        gridWrapper: {
            gridTemplateColumns: 'repeat(2, 1fr)',
        },
    },
}))

const skeletonArr = Array.from({ length: 6 })

const PageMyDrawings: FunctionComponent = () => {
    const classes = useStyles()
    const { data, isLoading, error } = useQueryPublicDrawings()
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
                    <Typography variant="h6">Newest Drawings</Typography>
                    <div className={classes.gridWrapper}>
                        {isLoading
                            ? skeletonArr.map((x, i) => (
                                  <Paper key={i} elevation={2}>
                                      <Skeleton
                                          width="100%"
                                          height="100%"
                                          variant="rect"
                                      />
                                  </Paper>
                              ))
                            : data.map(({ id, title, thumbnailUrl }) => (
                                  <DrawingCard
                                      key={id}
                                      id={id}
                                      title={title}
                                      thumbnailUrl={thumbnailUrl}
                                  />
                              ))}
                    </div>
                </Container>
            </FullScreenPage>
        </>
    )
}

export default PageMyDrawings
