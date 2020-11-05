import { useMutation, MutationResultPair, queryCache } from 'react-query'
import { userMyDrawings, currentDrawing, drawing } from 'logic/utilQueryKeys'
import { Storage } from 'logic/configAmplify'
import utilApiRequest from 'logic/utilApiRequest'
import utilGetIdentityId from 'logic/utilGetIdentityId'

import { Drawing, HttpMethods, ApiError, CreateDrawingFormData } from 'types'

const getUploadResults = (
    putResults
): [thumbnailRes?: string, drawStackRes?: string] => {
    const thumbnailRes = putResults[0].key
    const drawStackRes = putResults[1].key
    if (!thumbnailRes || !drawStackRes) {
        throw new Error('Problem uploading drawing files')
    }
    return [thumbnailRes, drawStackRes]
}

const createDrawing = async ({
    title,
    publish,
}: CreateDrawingFormData): Promise<Drawing> => {
    const {
        thumbnailBlob,
        drawStack,
        startTime,
        width,
        height,
        resolution,
    } = queryCache.getQueryData(currentDrawing)
    const identityId = await utilGetIdentityId()
    const putResults = await Promise.all([
        Storage.put(`${identityId}/${Date.now()}.png`, thumbnailBlob, {
            level: 'public',
        }),
        Storage.put(
            `${identityId}/${Date.now()}.json`,
            JSON.stringify(drawStack),
            { level: 'public' }
        ),
    ])

    const [thumbnailRes, drawStackRes] = getUploadResults(putResults)

    const newDrawing = await utilApiRequest<Drawing>({
        path: '/v1/drawings',
        body: {
            thumbnailUrl: thumbnailRes,
            drawStepsUrl: drawStackRes,
            title,
            startTime,
            endTime: new Date().toISOString(),
            width,
            height,
            resolution,
            publish,
        },
        method: HttpMethods.POST,
    })
    queryCache.invalidateQueries(userMyDrawings)
    queryCache.invalidateQueries(currentDrawing)
    queryCache.setQueryData(drawing(newDrawing.id), newDrawing)
    return newDrawing
}

export default function useMutationCreateDrawing(): MutationResultPair<
    Drawing,
    ApiError,
    CreateDrawingFormData,
    Drawing
> {
    return useMutation<Drawing, ApiError>(createDrawing)
}
