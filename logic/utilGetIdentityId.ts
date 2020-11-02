import { Auth } from 'logic/configAmplify'

const utilGetIdentityId = async (): Promise<string> => {
    const { identityId } = await Auth.currentCredentials()
    return identityId
}

export default utilGetIdentityId
