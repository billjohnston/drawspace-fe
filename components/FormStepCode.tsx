import { FunctionComponent } from 'react'
import Form from 'components/Form'
import FormFieldText from 'components/FormFieldText'
import useMutationLogin from 'logic/useMutationLogin'
import { TextFieldType, StepFormComponentProps } from 'types'
import FormSubmitArea from 'components/FormSubmitArea'
import FormSubmitButton from 'components/FormSubmitButton'
import Button from '@material-ui/core/Button'

const validationSchema = {
    code: {
        presence: true,
        length: { is: 6 },
    },
}

const FormStepCode: FunctionComponent<StepFormComponentProps> = ({
    setClosed,
    goBackStep,
}) => {
    const [handleSubmit] = useMutationLogin()
    const handleSuccess = (): void => {
        setClosed()
    }
    return (
        <Form
            schema={validationSchema}
            onSubmit={handleSubmit}
            onSuccess={handleSuccess}
        >
            {({ submitting }) => (
                <>
                    <FormFieldText
                        disabled={submitting}
                        fieldKey="code"
                        textFieldType={TextFieldType.TEXT}
                        label="Verification Code"
                    />
                    <FormSubmitArea>
                        <Button onClick={goBackStep} variant="contained">
                            Back
                        </Button>
                        <FormSubmitButton
                            submitting={submitting}
                            label="Submit Code"
                        />
                    </FormSubmitArea>
                </>
            )}
        </Form>
    )
}

export default FormStepCode
