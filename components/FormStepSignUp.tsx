import { FunctionComponent } from 'react'
import Form from 'components/Form'
import FormFieldText from 'components/FormFieldText'
import FormSubmit from 'components/FormSubmit'
import { TextFieldType } from 'types'
import useMutationStartSignIn from 'logic/useMutationStartSignIn'

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

const FormLoginStep: FunctionComponent<{
    goToNextStep: () => void
    setOpen: (open: boolean) => void
}> = ({ goToNextStep }) => {
    const [handleSubmit] = useMutationStartSignIn()
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
                    <FormSubmit submitting={submitting} label="Submit Email" />
                </>
            )}
        </Form>
    )
}

export default FormLoginStep
