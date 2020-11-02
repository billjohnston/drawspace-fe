import { FunctionComponent } from 'react'
import LoadingButton from 'components/LoadingButton'
import { ButtonType } from 'types'

const FormSubmit: FunctionComponent<{
    submitting: boolean
    disabled?: boolean
    label: string
}> = ({ submitting, disabled = false, label }) => {
    return (
        <LoadingButton
            type={ButtonType.SUBMIT}
            disabled={disabled}
            loading={submitting}
        >
            {label}
        </LoadingButton>
    )
}

export default FormSubmit
