import { FunctionComponent } from 'react'
import Form from 'components/Form'
import FormFieldText from 'components/FormFieldText'
import { TextFieldType, StepFormComponentProps } from 'types'
import useMutationCreateDrawing from 'logic/useMutationCreateDrawing'
import FormSubmitArea from 'components/FormSubmitArea'
import FormSubmitButton from 'components/FormSubmitButton'
import FormFieldSwitch from 'components/FormFieldSwitch'
import { useRouter } from 'next/router'

const FormLoginStep: FunctionComponent<StepFormComponentProps> = () => {
    const validationSchema = {
        title: {
            presence: true,
            length: { minimum: 1, maximum: 255 },
            type: 'string',
        },
        publish: {
            presence: true,
            type: 'boolean',
        },
    }

    const initial = {
        publish: true,
    }

    const router = useRouter()
    const [handleSubmit] = useMutationCreateDrawing()
    const handleSuccess = ({ result }): void => {
        router.push(`/drawing-detail?id=${result.id}`)
    }
    return (
        <Form
            schema={validationSchema}
            onSubmit={handleSubmit}
            onSuccess={handleSuccess}
            initialValues={initial}
        >
            {({ submitting }) => (
                <>
                    <FormFieldText
                        disabled={submitting}
                        fieldKey="title"
                        textFieldType={TextFieldType.TEXT}
                        label="Name Your Drawing"
                    />
                    <FormFieldSwitch
                        disabled={submitting}
                        fieldKey="publish"
                        label="Public"
                    />
                    <FormSubmitArea>
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
