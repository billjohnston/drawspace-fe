import { FunctionComponent } from 'react'
import Form from 'components/Form'
import FormFieldText from 'components/FormFieldText'
import useMutationStartSignUp from 'logic/useMutationStartSignUp'
import FormSubmitArea from 'components/FormSubmitArea'
import FormSubmitButton from 'components/FormSubmitButton'
import Button from '@material-ui/core/Button'
import { TextFieldType, StepFormComponentProps } from 'types'

const validationSchema = {
    email: {
        presence: true,
        email: true,
    },
    name: {
        presence: true,
        length: { maximum: 75 },
    },
}

const FormLoginStep: FunctionComponent<StepFormComponentProps> = ({
    goToNextStep,
    goBackStep,
}) => {
    const [handleSubmit] = useMutationStartSignUp()
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
                    <FormFieldText
                        disabled={submitting}
                        fieldKey="name"
                        textFieldType={TextFieldType.TEXT}
                        label="Name"
                    />
                    <FormSubmitArea>
                        <Button onClick={goBackStep} variant="contained">
                            Back
                        </Button>
                        <FormSubmitButton
                            submitting={submitting}
                            label="Submit"
                        />
                    </FormSubmitArea>
                </>
            )}
        </Form>
    )
}

export default FormLoginStep
