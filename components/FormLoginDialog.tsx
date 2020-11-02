import { FunctionComponent, useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'

import FormStepLogin from 'components/FormStepLogin'
import FormStepCode from 'components/FormStepCode'
import FormStepSignUp from 'components/FormStepSignUp'
import FormStepLoginSignupChoice from 'components/FormStepLoginSignupChoice'

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

const steps = [
    {
        StepComponent: FormStepLoginSignupChoice,
        label: 'Login Or Sign Up',
    },
    {
        label: 'Submit Info',
    },
    {
        StepComponent: FormStepCode,
        label: 'Verify Email',
    },
]

interface Props {
    open: boolean
    setOpen: () => void
    setClosed: () => void
}

const FormLoginDialog: FunctionComponent<Props> = ({
    open,
    setOpen,
    setClosed,
}) => {
    const classes = useStyles()
    const [activeStep, setActiveStep] = useState(0)
    const { StepComponent } = steps[activeStep]

    const handleLogin = () => {
        steps[1].StepComponent = FormStepLogin
        setActiveStep(1)
    }
    const handleSignUp = () => {
        steps[1].StepComponent = FormStepSignUp
        setActiveStep(1)
    }
    const goToNextStep = () => {
        setActiveStep(activeStep + 1)
    }
    const goBackStep = () => {
        setActiveStep(activeStep - 1)
    }
    const handleExited = () => {
        setActiveStep(0)
    }
    return (
        <Dialog
            aria-labelledby="Login / Sign Up"
            open={open}
            onClose={setClosed}
            fullWidth
            maxWidth="sm"
            onExited={handleExited}
        >
            {/* <DialogTitle id="Login / Sign Up">Login / Sign Up</DialogTitle> */}
            <div className={classes.dialogPadding}>
                <Stepper activeStep={activeStep}>
                    {steps.map(({ label }) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    <StepComponent
                        goToNextStep={goToNextStep}
                        goBackStep={goBackStep}
                        setOpen={setOpen}
                        setClosed={setClosed}
                        handleLogin={handleLogin}
                        handleSignUp={handleSignUp}
                    />
                </div>
            </div>
        </Dialog>
    )
}

export default FormLoginDialog
