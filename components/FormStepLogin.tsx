import { FunctionComponent } from 'react'
import Form from 'components/Form'
import FormFieldText from 'components/FormFieldText'
import { TextFieldType, StepFormComponentProps } from 'types'
import useMutationStartLogin from 'logic/useMutationStartLogin'
import FormSubmitArea from 'components/FormSubmitArea'
import FormSubmitButton from 'components/FormSubmitButton'
import Button from '@material-ui/core/Button'

const validationSchema = {
    email: {
        presence: true,
        email: true,
    },
}

const FormLoginStep: FunctionComponent<StepFormComponentProps> = ({
    goToNextStep,
    goBackStep,
}) => {
    const [handleSubmit] = useMutationStartLogin()
    const handleSuccess = (): void => {
        goToNextStep()
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
                        fieldKey="email"
                        textFieldType={TextFieldType.TEXT}
                        label="Email"
                    />
                    <FormSubmitArea>
                        <Button onClick={goBackStep} variant="contained">
                            Back
                        </Button>
                        <FormSubmitButton
                            submitting={submitting}
                            label="Submit Email"
                        />
                    </FormSubmitArea>
                </>
            )}
        </Form>
    )
}

export default FormLoginStep
