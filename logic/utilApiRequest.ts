import { Auth } from 'logic/configAmplify'
import utilAjax from 'logic/utilAjax'
import { HttpMethods, Credentials } from 'types'

export default async function utilApiRequest<TAjaxResponse>({
    path,
    method,
    body,
    queryParams,
    headers,
    auth = true,
    credentials,
}: {
    path: string
    method: HttpMethods
    body?: Record<string, unknown>
    queryParams?: Record<string, unknown>
    headers?: Record<string, unknown>
    auth?: boolean
    credentials?: Credentials
}): Promise<TAjaxResponse> {
    let jwtToken
    if (auth) {
        const session = await Auth.currentSession()
        jwtToken = session.getIdToken().getJwtToken()
    }
    return utilAjax({
        url: `${process.env.NEXT_PUBLIC_API_HOST}${path}`,
        method,
        body,
        queryParams,
        credentials,
        headers: {
            ...headers,
            ...(auth ? { authorization: `JWT ${jwtToken}` } : {}),
        },
    })
}
