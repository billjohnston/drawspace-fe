import { FunctionComponent, useState } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import FormLoginStep from 'components/FormStepEmail'
import FormStepCode from 'components/FormStepCode'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(({ spacing }) => ({
    dialogPadding: {
        padding: spacing(4),
    },
}))

const steps = [
    {
        StepComponent: FormLoginStep,
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
    const [activeStep, setActiveStep] = useState(0)
    const { StepComponent } = steps[activeStep]
    const goToNextStep = () => {
        setActiveStep(activeStep + 1)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <>
            <Button color="inherit" onClick={handleOpen} aria-label="Login">
                Login
            </Button>
            <Dialog
                aria-labelledby="Login Form"
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle id="Login Form">Login</DialogTitle>
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
                            setOpen={setOpen}
                        />
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default FormLoginDialog
