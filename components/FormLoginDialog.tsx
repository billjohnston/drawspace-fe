import { FunctionComponent, useState } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import FormStepLogin from 'components/FormStepLogin'
import FormStepCode from 'components/FormStepCode'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(({ spacing }) => ({
    dialogPadding: {
        padding: spacing(4),
    },
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

const loginSteps = [
    {
        StepComponent: FormStepLogin,
        label: 'Enter your email',
    },
    {
        StepComponent: FormStepCode,
        label: 'Verify email',
    },
]

const signUpSteps = [
    {
        StepComponent: FormStepLogin,
        label: 'Enter your email',
    },
    {
        StepComponent: FormStepCode,
        label: 'Verify email',
    },
]

const FormLoginDialog: FunctionComponent = () => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [loginOrSignupSteps, setLoginOrSignupSteps] = useState([])
    const [activeStep, setActiveStep] = useState(0)
    const activeStepObj = loginOrSignupSteps[activeStep]

    const handleLogin = () => {
        setLoginOrSignupSteps(loginSteps)
    }
    const handleSignUp = () => {
        setLoginOrSignupSteps(signUpSteps)
    }
    const goToNextStep = () => {
        setActiveStep(activeStep + 1)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleExited = () => {
        setLoginOrSignupSteps([])
    }
    return (
        <>
            <Button
                color="inherit"
                onClick={handleOpen}
                aria-label="Login / Sign Up"
            >
                Login / Sign Up
            </Button>
            <Dialog
                aria-labelledby="Login / Sign Up"
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
                onExited={handleExited}
            >
                <DialogTitle id="Login / Sign Up">Login / Sign Up</DialogTitle>
                <div className={classes.dialogPadding}>
                    {loginOrSignupSteps.length ? (
                        <>
                            <Stepper activeStep={activeStep}>
                                {loginOrSignupSteps.map(({ label }) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                            <div>
                                <activeStepObj.StepComponent
                                    goToNextStep={goToNextStep}
                                    setOpen={setOpen}
                                />
                            </div>
                        </>
                    ) : (
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
                    )}
                </div>
            </Dialog>
        </>
    )
}

export default FormLoginDialog
