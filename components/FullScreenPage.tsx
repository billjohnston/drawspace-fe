import { FunctionComponent } from 'react'
import Navigation from 'components/Navigation'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    fullPageWrapper: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    navigation: {
        height: 64,
    },
    content: {
        display: 'flex',
        flex: 1,
    },
})

const FullScreenPage: FunctionComponent = ({ children }) => {
    const classes = useStyles()
    return (
        <div className={classes.fullPageWrapper}>
            <div className={classes.navigation}>
                <Navigation />
            </div>
            <div className={classes.content}>{children}</div>
        </div>
    )
}

export default FullScreenPage
