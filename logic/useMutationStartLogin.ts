import { Auth } from 'logic/configAmplify'
import { useMutation, MutationResultPair, queryCache } from 'react-query'
import { userCognitoUser, userEmail } from 'logic/utilQueryKeys'
import { FORM_ERROR } from 'final-form'
import { FormResponse } from 'types'

type MutationRes = FormResponse<void>

const startSignIn = async ({
    email,
}: {
    email: string
}): Promise<MutationRes> => {
    try {
        const cognitoUser = await Auth.signIn(email)
        const commonQueryConfig = {
            cacheTime: 60 * 60 * 1000, // expires in an hour
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        }
        queryCache.setQueryData(userCognitoUser, cognitoUser, commonQueryConfig)
        queryCache.setQueryData(userEmail, email, commonQueryConfig)
    } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(e)
        if (e.code === 'UserNotFoundException') {
            return {
                fieldErrors: {
                    email: 'An account with this email address does not exist',
                },
            }
        }
        return {
            fieldErrors: {
                [FORM_ERROR]: 'Unknown error, try again',
            },
        }
    }
}

export default function useMutationCreatePost(): MutationResultPair<
    MutationRes,
    never,
    { email: string },
    MutationRes
> {
    return useMutation<MutationRes, never>(startSignIn)
}
