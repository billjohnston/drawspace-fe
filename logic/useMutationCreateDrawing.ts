import { useMutation, MutationResultPair, queryCache } from 'react-query'
import { userMyDrawings, currentDrawing, drawing } from 'logic/utilQueryKeys'
import { Storage } from 'logic/configAmplify'
import { FORM_ERROR } from 'final-form'
import utilApiRequest from 'logic/utilApiRequest'
import utilGetIdentityId from 'logic/utilGetIdentityId'

import { Drawing, HttpMethods, ApiError, CreateDrawingFormData } from 'types'

const createDrawing = async ({
    title,
    publish,
}: CreateDrawingFormData): Promise<Drawing> => {
    try {
        const {
            thumbnailBlob,
            drawStack,
            startTime,
            width,
            height,
            resolution,
        } = queryCache.getQueryData(currentDrawing)
        const identityId = await utilGetIdentityId()
        const [
            { key: thumbnailRes },
            { key: drawStackRes },
        ] = await Promise.all([
            Storage.put(`${identityId}/${Date.now()}.png`, thumbnailBlob, {
                level: 'public',
            }),
            Storage.put(
                `${identityId}/${Date.now()}.json`,
                JSON.stringify(drawStack),
                { level: 'public' }
            ),
        ])
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
    } catch (e) {
        return {
            fieldErrors: {
                [FORM_ERROR]: e.message,
            },
        }
    }
}

export default function useMutationCreateDrawing(): MutationResultPair<
    Drawing,
    ApiError,
    CreateDrawingFormData,
    Drawing
> {
    return useMutation<Drawing, ApiError>(createDrawing)
}
