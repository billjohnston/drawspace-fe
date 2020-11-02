import { randomPassword, lower, upper, digits } from 'secure-random-password'
import { Auth } from 'logic/configAmplify'
import { useMutation, MutationResultPair, queryCache } from 'react-query'
import { userCognitoUser, userEmail } from 'logic/utilQueryKeys'
import { FORM_ERROR } from 'final-form'
import { FormResponse } from 'types'

type MutationRes = FormResponse<void>

const startSignIn = async ({
    email,
    name,
}: {
    email: string
    name: string
}): Promise<MutationRes> => {
    try {
        await Auth.signUp({
            username: email,
            attributes: {
                'custom:Name': name,
            },
            password: randomPassword({
                characters: [lower, upper, digits],
            }),
        })
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
        console.log(e.code)
        if (e.code === 'UsernameExistsException') {
            return {
                fieldErrors: {
                    email:
                        'Account with this email address already exists, Login to continue',
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
    { email: string; name: string },
    MutationRes
> {
    return useMutation<MutationRes, never>(startSignIn)
}
