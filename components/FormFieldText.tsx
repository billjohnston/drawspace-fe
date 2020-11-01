import { FunctionComponent } from 'react'
import TextField from '@material-ui/core/TextField'
import { useField } from 'react-final-form'
import { TextFieldType } from 'types'

const FormFieldText: FunctionComponent<{
    fieldKey: string
    textFieldType: TextFieldType
    placeholder?: string
    disabled?: boolean
    label: string
}> = ({ fieldKey, textFieldType, placeholder, disabled = false, label }) => {
    const { input, meta } = useField(fieldKey)
    const { value, name, onChange, onBlur, onFocus } = input
    const { touched, error, submitError } = meta
    const errorText = touched && (error || submitError)
    const hasError = Boolean(errorText)
    return (
        <TextField
            disabled={disabled}
            value={value}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            label={label}
            type={textFieldType}
            margin="normal"
            variant="outlined"
            error={hasError}
            helperText={errorText}
            placeholder={placeholder}
            fullWidth
        />
    )
}

export default FormFieldText
