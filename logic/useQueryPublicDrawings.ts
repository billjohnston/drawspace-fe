import { Storage } from 'logic/configAmplify'
import { usePaginatedQuery, PaginatedQueryResult } from 'react-query'
import { publicDrawings } from 'logic/utilQueryKeys'
import utilApiRequest from 'logic/utilApiRequest'

import { Drawing, HttpMethods, ApiError, ApiListResult } from 'types'

const getPublicDrawings = () => async (): Promise<Drawing[]> => {
    const res = await utilApiRequest<ApiListResult<Drawing>>({
        path: `/v1/drawings`,
        method: HttpMethods.GET,
        auth: false,
    })

    return Promise.all(
        res.items.map(async (drawing) => {
            const signedThumbnailUrl: string = await Storage.get(
                drawing.thumbnailUrl,
                {
                    level: 'public',
                }
            )
            return {
                ...drawing,
                thumbnailUrl: signedThumbnailUrl,
            }
        })
    )
}

export default function useQueryMyPosts(): PaginatedQueryResult<
    Drawing[],
    ApiError
> {
    return usePaginatedQuery<Drawing[], ApiError>({
        queryKey: publicDrawings,
        queryFn: getPublicDrawings(),
    })
}
