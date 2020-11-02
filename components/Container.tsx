import { FunctionComponent } from 'react'
import MuiContainer from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(({ spacing }) => ({
    pageContent: {
        marginTop: spacing(2),
        marginBottom: spacing(2),
    },
}))

const Container: FunctionComponent = ({ children }) => {
    const classes = useStyles()

    return (
        <MuiContainer maxWidth="sm">
            <div className={classes.pageContent}>{children}</div>
        </MuiContainer>
    )
}

export default Container
