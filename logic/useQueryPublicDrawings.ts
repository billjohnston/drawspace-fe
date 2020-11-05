import { Storage } from 'logic/configAmplify'
import { usePaginatedQuery, PaginatedQueryResult } from 'react-query'
import { publicDrawings } from 'logic/utilQueryKeys'
import utilApiRequest from 'logic/utilApiRequest'

import {
    UserPopulatedDrawing,
    HttpMethods,
    ApiError,
    ApiListResult,
} from 'types'

const getPublicDrawings = () => async (): Promise<UserPopulatedDrawing[]> => {
    const res = await utilApiRequest<ApiListResult<UserPopulatedDrawing>>({
        path: `/v1/drawings`,
        method: HttpMethods.GET,
        auth: false,
    })
    return Promise.all(
        res.items.map(async (drawing) => {
            let signedThumbnailUrl: string
            const storageGetRes = await Storage.get(drawing.thumbnailUrl, {
                level: 'public',
            })
            if (typeof storageGetRes === 'string') {
                signedThumbnailUrl = storageGetRes
            } else {
                throw new Error('Failed to get signed thumbnail')
            }
            return {
                ...drawing,
                thumbnailUrl: signedThumbnailUrl,
            }
        })
    )
}

export default function useQueryMyPosts(): PaginatedQueryResult<
    UserPopulatedDrawing[],
    ApiError
> {
    return usePaginatedQuery<UserPopulatedDrawing[], ApiError>({
        queryKey: publicDrawings,
        queryFn: getPublicDrawings(),
    })
}
