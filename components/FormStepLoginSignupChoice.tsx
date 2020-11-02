import { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { StepFormComponentProps } from 'types'

const useStyles = makeStyles(({ spacing }) => ({
    loginSignupWrapper: {
        display: 'flex',
        alignItems: 'space-between',
        flexDirection: 'column',
        flex: 1,
    },
    loginButtonPadding: {
        paddingTop: spacing(4),
        paddingBottom: spacing(4),
    },
}))

const FormStepLoginSignupChoice: FunctionComponent<StepFormComponentProps> = ({
    handleLogin,
    handleSignUp,
}) => {
    const classes = useStyles()
    return (
        <div className={classes.loginSignupWrapper}>
            <div className={classes.loginButtonPadding}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    size="large"
                    fullWidth
                >
                    Login
                </Button>
            </div>
            <div className={classes.loginButtonPadding}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSignUp}
                    size="large"
                    fullWidth
                >
                    Sign Up
                </Button>
            </div>
        </div>
    )
}

export default FormStepLoginSignupChoice
