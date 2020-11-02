import { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FullScreenPage from 'components/FullScreenPage'

const useStyles = makeStyles(({ spacing }) => ({
    wrapper: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    heading: {
        marginBottom: spacing(2),
    },
}))

const PageError: FunctionComponent<{ error: string }> = ({ error }) => {
    const classes = useStyles()
    return (
        <FullScreenPage>
            <div className={classes.wrapper}>
                <Typography
                    variant="h4"
                    color="error"
                    className={classes.heading}
                >
                    Error loading page D:
                </Typography>
                <Typography variant="body1">{error}</Typography>
            </div>
        </FullScreenPage>
    )
}

export default PageError
