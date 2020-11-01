import { FunctionComponent } from 'react'
import Typography from '@material-ui/core/Typography'

const FormError: FunctionComponent = ({ children }) => (
    <Typography variant="body1" color="error">
        {children}
    </Typography>
)

export default FormError
