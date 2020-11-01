import { randomPassword, lower, upper, digits } from 'secure-random-password'
import { Auth } from 'logic/configAmplify'
import { useMutation, MutationResultPair, queryCache } from 'react-query'
import { userCognitoUser, userEmail } from 'logic/utilQueryKeys'

const startSignIn = async ({
    email,
    name,
}: {
    email: string
    name: string
}): Promise<void> => {
    try {
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
        } catch (e) {
            // if they are already signed up ignore error and sign in
            console.log(1, e)
        }
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
        console.warn(2, e)
        throw e
    }
}

export default function useMutationCreatePost(): MutationResultPair<
    void,
    never,
    { email: string },
    void
> {
    return useMutation<void, never>(startSignIn)
}
