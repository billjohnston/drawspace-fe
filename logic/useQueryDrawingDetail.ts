import { Storage } from 'logic/configAmplify'
import { useQuery, QueryResult } from 'react-query'
import { drawing } from 'logic/utilQueryKeys'
import utilApiRequest from 'logic/utilApiRequest'

import { Drawing, HttpMethods, ApiError } from 'types'


const getDrawing = (drawingId: string) => async (): Promise<Drawing> => {
    const res = await utilApiRequest<Drawing>({
        path: `/v1/drawings/${drawingId}`,
        method: HttpMethods.GET,
        auth: false,
    })

    let signedThumbnailUrl: string
    const storageGetRes = await Storage.get(res.thumbnailUrl, {
        level: 'public',
    })
    if (typeof storageGetRes === 'string') {
        signedThumbnailUrl = storageGetRes
    } else {
        throw new Error('Failed to get signed thumbnail')
    }

    return {
        ...res,
        thumbnailUrl: signedThumbnailUrl,
    }
}

export default function useQueryDrawingDetail(
    drawingId: string
): QueryResult<Drawing, ApiError> {
    return useQuery<Drawing, ApiError>({
        queryKey: drawing(drawingId),
        queryFn: getDrawing(drawingId),
        config: {
            enabled: drawingId,
        },
    })
}
