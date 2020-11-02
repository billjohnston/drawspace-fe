import { FunctionComponent } from 'react'
import { useField } from 'react-final-form'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

const FormFieldText: FunctionComponent<{
    fieldKey: string
    disabled?: boolean
    label: string
}> = ({ fieldKey, disabled, label }) => {
    const { input } = useField(fieldKey)
    const { value, name, onChange, onBlur, onFocus } = input

    const handleChange = (event) => {
        onChange(event.target.checked)
    }
    return (
        <FormControlLabel
            control={
                <Switch
                    checked={value}
                    onChange={handleChange}
                    name={name}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    disabled={disabled}
                />
            }
            label={label}
        />
    )
}

export default FormFieldText
