import { FunctionComponent } from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'

const useStyles = makeStyles(({ breakpoints }) =>
    createStyles({
        inputPadding: {
            margin: [[16, 0, 8]],
            width: '100%',
            display: 'flex',
        },
        buttonRow: {
            display: 'flex',
            justifyContent: 'space-between',
            flex: 1,
        },
    })
)

const FormSubmit: FunctionComponent = ({ children }) => {
    const classes = useStyles()
    return (
        <div className={classes.inputPadding}>
            <div className={classes.buttonRow}>{children}</div>
        </div>
    )
}

export default FormSubmit
