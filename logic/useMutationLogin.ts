import { Auth } from 'logic/configAmplify'
import { useMutation, MutationResultPair, queryCache } from 'react-query'
import { userAuthenticated, userCognitoUser } from 'logic/utilQueryKeys'

const login = async ({ code }: { code: string }): Promise<void> => {
    const cognitoUser = queryCache.getQueryData(userCognitoUser)
    await Auth.sendCustomChallengeAnswer(cognitoUser, code)
    await Auth.currentSession()
}

const clearUserPostCache = () => queryCache.invalidateQueries(userAuthenticated)

export default function useMutationCreatePost(): MutationResultPair<
    void,
    never,
    { code: string },
    never
> {
    return useMutation<void, never>(login, {
        onSuccess: clearUserPostCache,
    })
}
