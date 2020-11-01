import { FunctionComponent } from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import LoadingButton from 'components/LoadingButton'
import { ButtonType } from 'types'

const useStyles = makeStyles(({ breakpoints }) =>
    createStyles({
        inputPadding: {
            margin: [[16, 0, 8]],
        },
        buttonRow: {
            display: 'flex',
            justifyContent: 'flex-end',
            flex: 1,
        },
        buttonWrapper: {
            [breakpoints.only('xs')]: {
                width: '100%',
            },
            [breakpoints.up('sm')]: {
                width: 150,
            },
        },
    })
)

const FormSubmit: FunctionComponent<{
    submitting: boolean
    disabled?: boolean
    label: string
}> = ({ submitting, disabled = false, label }) => {
    const classes = useStyles()
    return (
        <div className={classes.inputPadding}>
            <div className={classes.buttonRow}>
                <div className={classes.buttonWrapper}>
                    <LoadingButton
                        type={ButtonType.SUBMIT}
                        disabled={disabled}
                        loading={submitting}
                    >
                        {label}
                    </LoadingButton>
                </div>
            </div>
        </div>
    )
}

export default FormSubmit
