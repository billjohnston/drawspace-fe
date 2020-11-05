import { stringify } from 'qs'
import { HttpMethods, Credentials } from 'types'

export default async function utilAJax<TAjaxResponse>({
    url,
    method,
    body,
    queryParams,
    headers,
    credentials = Credentials.SAME_ORIGIN,
}: {
    url: string
    method: HttpMethods
    body?: Record<string, unknown>
    queryParams?: Record<string, unknown>
    headers?: Record<string, unknown>
    credentials?: Credentials
}): Promise<TAjaxResponse> {
    const queryString = queryParams
        ? `?${stringify(queryParams, { arrayFormat: 'comma', encode: false })}`
        : ''
    const response = await fetch(`${url}${queryString}`, {
        method,
        credentials,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
    })
    return response.json()
}
