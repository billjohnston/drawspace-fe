import { FunctionComponent, useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import CircularProgress from '@material-ui/core/CircularProgress'

import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import FormStepLogin from 'components/FormStepLogin'
import FormStepCode from 'components/FormStepCode'
import FormStepSignUp from 'components/FormStepSignUp'
import FormStepDrawing from 'components/FormStepDrawing'
import FormStepLoginSignupChoice from 'components/FormStepLoginSignupChoice'
import useQueryIsAuthenticated from 'logic/useQueryIsAuthenticated'

import { useTheme, makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles(({ spacing, palette, breakpoints }) => ({
    [breakpoints.only('xs')]: {
        dialogPadding: {
            padding: spacing(1),
            marginTop: spacing(5),
        },
    },
    [breakpoints.up('sm')]: {
        dialogPadding: {
            padding: spacing(4),
        },
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
    closeButton: {
        position: 'absolute',
        right: spacing(1),
        top: spacing(1),
        color: palette.grey[500],
    },
}))

const stepsUnauthenticated = [
    {
        StepComponent: FormStepLoginSignupChoice,
        label: 'Login / SignUp',
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
    const [whichSteps, setWhichSteps] = useState([])

    const handleOnEntering = () => {
        if (isAuthenticated) {
            setWhichSteps(stepsAuthenticated)
        } else {
            setWhichSteps(stepsUnauthenticated)
        }
    }
    const activeStepObj = whichSteps[activeStep]
    const handleLogin = () => {
        whichSteps[1].StepComponent = FormStepLogin
        setActiveStep(1)
    }
    const handleSignUp = () => {
        whichSteps[1].StepComponent = FormStepSignUp
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
            onEntering={handleOnEntering}
            fullScreen={isXs}
        >
            <IconButton
                aria-label="close"
                className={classes.closeButton}
                onClick={setClosed}
            >
                <CloseIcon />
            </IconButton>
            <div className={classes.dialogPadding}>
                {isFetching ? (
                    <CircularProgress variant="determinate" />
                ) : (
                    whichSteps &&
                    activeStepObj && (
                        <>
                            <Stepper alternativeLabel activeStep={activeStep}>
                                {whichSteps.map(({ label }) => (
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
                                    isSaveDialog
                                />
                            </div>
                        </>
                    )
                )}
            </div>
        </Dialog>
    )
}

export default FormLoginDialog
