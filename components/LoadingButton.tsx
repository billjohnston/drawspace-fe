import { FunctionComponent } from 'react'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import { ButtonType } from 'types'

const useStyles = makeStyles({
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingWrapper: {
        position: 'relative',
        width: '100%',
    },
})

const RenderLoading: FunctionComponent<{ loading: boolean }> = ({
    loading,
}) => {
    const classes = useStyles()
    return (
        loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
        )
    )
}

const LoadingButton: FunctionComponent<{
    onClick?: () => void
    loading: boolean
    type: ButtonType
    disabled?: boolean
}> = ({ children, onClick, loading = false, type, disabled = false }) => {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <div className={classes.loadingWrapper}>
                <Button
                    fullWidth
                    variant="contained"
                    disabled={disabled || loading}
                    onClick={onClick}
                    type={type}
                >
                    {children}
                </Button>
                <RenderLoading loading={loading} />
            </div>
        </div>
    )
}

export default LoadingButton
