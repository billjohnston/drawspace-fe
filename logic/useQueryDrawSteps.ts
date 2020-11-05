import { Storage } from 'logic/configAmplify'
import { useQuery, QueryResult } from 'react-query'
import { drawing } from 'logic/utilQueryKeys'
import utilAjax from 'logic/utilAjax'

import { DrawStack, ApiError, HttpMethods } from 'types'

const getDrawStack = (drawStepsUrl: string) => async (): Promise<
    DrawStack[]
> => {
    let signedThumbnailUrl: string
    const storageGetRes = await Storage.get(drawStepsUrl, {
        level: 'public',
    })
    if (typeof storageGetRes === 'string') {
        signedThumbnailUrl = storageGetRes
    } else {
        throw new Error('Failed to get signed thumbnail')
    }
    return utilAjax<DrawStack[]>({
        method: HttpMethods.GET,
        url: signedThumbnailUrl,
    })
}

export default function useQueryDrawStackDetail(
    drawStepsUrl: string
): QueryResult<DrawStack[], ApiError> {
    return useQuery<DrawStack[], ApiError>({
        queryKey: drawing(drawStepsUrl),
        queryFn: getDrawStack(drawStepsUrl),
        config: {
            enabled: drawStepsUrl,
            cache: Infinity,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        },
    })
}
