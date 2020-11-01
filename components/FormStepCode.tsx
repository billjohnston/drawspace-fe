import { FunctionComponent } from 'react'
import Form from 'components/Form'
import FormFieldText from 'components/FormFieldText'
import FormSubmit from 'components/FormSubmit'
import { TextFieldType } from 'types'
import useMutationLogin from 'logic/useMutationLogin';

const FormStepCode: FunctionComponent<{
    goToNextStep: () => void
    setOpen: (open: boolean) => void
}> = ({ setOpen }) => {
    const [handleSubmit] = useMutationLogin()
    const handleSuccess = (): void => {
        setOpen(false)
    }
    return (
        <Form onSubmit={handleSubmit} onSuccess={handleSuccess}>
            {({ submitting }) => (
                <>
                    <FormFieldText
                        disabled={submitting}
                        fieldKey="code"
                        textFieldType={TextFieldType.TEXT}
                        label="Verification Code"
                    />
                    <FormSubmit submitting={submitting} label="Submit Email" />
                </>
            )}
        </Form>
    )
}

export default FormStepCode
