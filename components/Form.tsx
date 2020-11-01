import {
    FunctionComponent,
    ReactNode,
    useState,
    useCallback,
    useMemo,
} from 'react'
import { Form as Rff } from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import FormError from 'components/FormError'
import { async as validate } from 'validate.js'

const defaultPreSubmitPromises = []

const validateForm = (schema: Record<string, unknown>) => async (
    formData: Record<string, unknown>
): Promise<void> =>
    validate(formData, schema)
        .then(() => {})
        .catch((err) => err)

const Form: FunctionComponent<{
    schema?: Record<string, unknown>
    initialValues?: Record<string, unknown>
    onSubmit: ({
        formData,
    }: {
        formData: Record<string, unknown>
    }) => Promise<Record<string, unknown>>
    onSuccess?: ({
        formData,
        result,
    }: {
        formData: Record<string, unknown>
        result: Record<string, unknown>
    }) => Promise<void>
    children?: ({
        submitting,
        addPreSubmitPromise,
        values,
    }: {
        submitting: boolean
        addPreSubmitPromise: (promise: Promise<void>) => void
        values: Record<string, unknown>
    }) => ReactNode
}> = ({ schema, initialValues, onSubmit, onSuccess, children }) => {
    const [preSubmitPromises, setPreSubmitPromise] = useState(
        defaultPreSubmitPromises
    )
    const addPreSubmitPromise = useMemo(
        () => (newPromise) => {
            setPreSubmitPromise([...preSubmitPromises, newPromise])
        },
        [preSubmitPromises]
    )

    const validateFn = useCallback(validateForm(schema), [])

    const handleSubmitFn = useCallback(
        async (formData) => {
            try {
                await Promise.all(preSubmitPromises)
                const result = await onSubmit(formData)
                if (result && result.fieldErrors) {
                    return result.fieldErrors
                }
                await onSuccess({ formData, result })
            } catch (error) {
                return {
                    [FORM_ERROR]: 'Unknown error, please try submitting again',
                }
            }
        },
        [preSubmitPromises, onSubmit, onSuccess]
    )
    return (
        <Rff
            initialValues={initialValues}
            onSubmit={handleSubmitFn}
            validate={validateFn}
            subscription={{
                submitting: true,
                submitError: true,
            }}
            render={({ handleSubmit, submitting, submitError, values }) => (
                <form onSubmit={handleSubmit}>
                    {submitError && <FormError>{submitError}</FormError>}
                    {children({
                        submitting,
                        addPreSubmitPromise,
                        values,
                    })}
                    {/* Uncomment below to debug form values */}
                    {(() => {
                        const { FormSpy } = require('react-final-form')
                        return (
                            <FormSpy subscription={{ values: true }}>
                                {({ values: spyValues }) => (
                                    <pre>
                                        {JSON.stringify(spyValues, null, 2)}
                                    </pre>
                                )}
                            </FormSpy>
                        )
                    })()}
                </form>
            )}
        />
    )
}

export default Form
