import { Auth } from 'logic/configAmplify'
import { CognitoUser } from '@aws-amplify/auth'
import { randomPassword } from 'secure-random-password'

export const loginSignup = async ({
    email,
}: {
    email: string
}): Promise<CognitoUser> => {
    try {
        try {
            const params = {
                username: email,
                password: randomPassword(),
            }
            await Auth.signUp(params)
        } catch (e) {
            if (e.code !== 'UsernameExistsException') {
                throw e
            }
        }
        const cognitoUser = await Auth.signIn(email)
        return cognitoUser
    } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(e)
        throw e
    }
}

export const authChallenge = async ({
    code,
    cognitoUser,
}: {
    code: string
    cognitoUser: CognitoUser
}): Promise<void> => {
    await Auth.sendCustomChallengeAnswer(cognitoUser, code)
    await Auth.currentSession()
}
