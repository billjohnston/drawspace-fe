import { Auth } from 'logic/configAmplify'
import { useMutation, MutationResultPair, queryCache } from 'react-query'
import { userAuthenticated, userCognitoUser } from 'logic/utilQueryKeys'
import { FORM_ERROR } from 'final-form'
import { FormResponse } from 'types'

type MutationRes = FormResponse<void>

const login = async ({ code }: { code: string }): Promise<MutationRes> => {
    try {
        const cognitoUser = queryCache.getQueryData(userCognitoUser)
        await Auth.sendCustomChallengeAnswer(cognitoUser, code)
        await Auth.currentSession()
        queryCache.invalidateQueries(userAuthenticated)
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
        if (e === 'No current user') {
            return {
                fieldErrors: {
                    code: 'Invalid verification code',
                },
            }
        }
        if (e.code === 'NotAuthorizedException') {
            return {
                fieldErrors: {
                    code:
                        'Invalid verification code. Maximum retries reached, must generate a new code',
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
    { code: string },
    never
> {
    return useMutation<MutationRes, never>(login)
}
