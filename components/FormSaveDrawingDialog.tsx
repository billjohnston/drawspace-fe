import { FunctionComponent, useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import CircularProgress from '@material-ui/core/CircularProgress'

import FormStepLogin from 'components/FormStepLogin'
import FormStepCode from 'components/FormStepCode'
import FormStepSignUp from 'components/FormStepSignUp'
import FormStepDrawing from 'components/FormStepDrawing'
import FormStepLoginSignupChoice from 'components/FormStepLoginSignupChoice'
import useQueryIsAuthenticated from 'logic/useQueryIsAuthenticated'

import { useTheme, makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

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

const stepsUnauthenticated = [
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
    {
        StepComponent: FormStepDrawing,
        label: 'Submit Drawing',
    },
]
const stepsAuthenticated = [
    {
        StepComponent: FormStepDrawing,
        label: 'Submit Drawing',
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
    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only('xs'))
    const { data: isAuthenticated, isFetching } = useQueryIsAuthenticated()
    const classes = useStyles()
    const [activeStep, setActiveStep] = useState(0)

    let steps = []
    if (isFetching) {
        steps = []
    } else if (isAuthenticated) {
        steps = stepsAuthenticated
    } else {
        steps = stepsUnauthenticated
    }

    const activeStepObj = steps[activeStep]
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
            aria-labelledby="Save Drawing"
            open={open}
            onClose={setClosed}
            fullWidth
            maxWidth="sm"
            onExited={handleExited}
            fullScreen={isXs}
        >
            <div className={classes.dialogPadding}>
                {isFetching ? (
                    <CircularProgress variant="determinate" />
                ) : (
                    <>
                        <Stepper activeStep={activeStep}>
                            {steps.map(({ label }) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <div>
                            <activeStepObj.StepComponent
                                goToNextStep={goToNextStep}
                                goBackStep={goBackStep}
                                setOpen={setOpen}
                                setClosed={setClosed}
                                handleLogin={handleLogin}
                                handleSignUp={handleSignUp}
                            />
                        </div>
                    </>
                )}
            </div>
        </Dialog>
    )
}

export default FormLoginDialog
