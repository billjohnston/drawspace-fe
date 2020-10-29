import { MouseEvent, TouchEvent } from 'react'
import { Color } from 'types'

interface BrushArgs {
    canvas: HTMLCanvasElement
    canvasCtx: CanvasRenderingContext2D
    tmpCanvas: HTMLCanvasElement
    tmpCanvasCtx: CanvasRenderingContext2D
}

interface Coords {
    x: number
    y: number
}

type CanvasMouseOrTouch =
    | MouseEvent<HTMLCanvasElement>
    | TouchEvent<HTMLCanvasElement>

export const initCanvas = (
    canvasEl: HTMLCanvasElement
): CanvasRenderingContext2D => {
    /* eslint-disable no-param-reassign */
    canvasEl.width = canvasEl.offsetWidth * devicePixelRatio
    canvasEl.height = canvasEl.offsetHeight * devicePixelRatio
    /* eslint-enable */

    const context = canvasEl.getContext('2d')
    context.scale(devicePixelRatio, devicePixelRatio)
    return context
}

export const changeColor = ({
    color,
    tmpCanvasCtx,
}: {
    color: Color
    tmpCanvasCtx: CanvasRenderingContext2D
}): void => {
    /* eslint-disable no-param-reassign */
    tmpCanvasCtx.strokeStyle = color
    /* eslint-enable */
}

export const changeLineWidth = ({
    lineWidth,
    tmpCanvasCtx,
}: {
    lineWidth: number
    tmpCanvasCtx: CanvasRenderingContext2D
}): void => {
    /* eslint-disable no-param-reassign */
    tmpCanvasCtx.lineWidth = lineWidth
    /* eslint-enable */
}

const xyPosFromEvent = (e: CanvasMouseOrTouch) => {
    const { pageX, pageY } = e.nativeEvent
    const xPos = pageX - e.target.parentElement.offsetLeft
    const yPos = pageY - e.target.parentElement.offsetTop
    return [xPos, yPos]
}

const midPointBtw = (p1: Coords, p2: Coords): Coords => {
    return {
        x: p1.x + (p2.x - p1.x) / 2,
        y: p1.y + (p2.y - p1.y) / 2,
    }
}

export const brushes = {
    pencil: {
        init: ({
            canvas,
            canvasCtx,
            tmpCanvas,
            tmpCanvasCtx,
        }: BrushArgs): void => {},
        draw: (() => {
            const points = []
            return ({
                tmpCanvas,
                tmpCanvasCtx,
                e,
            }: {
                tmpCanvas: HTMLCanvasElement
                tmpCanvasCtx: CanvasRenderingContext2D
                e: CanvasMouseOrTouch
            }): Coords[] => {
                const [xPos, yPos] = xyPosFromEvent(e)
                points.push({ x: xPos, y: yPos })

                tmpCanvasCtx.clearRect(0, 0, tmpCanvas.width, tmpCanvas.height)

                let p1 = points[0]
                let p2 = points[1]

                tmpCanvasCtx.beginPath()
                tmpCanvasCtx.moveTo(p1.x, p1.y)
                points.forEach((x, i) => {
                    const midPoint = midPointBtw(p1, p2)
                    tmpCanvasCtx.quadraticCurveTo(
                        p1.x,
                        p1.y,
                        midPoint.x,
                        midPoint.y
                    )
                    p1 = points[i]
                    p2 = points[i + 1]
                })

                tmpCanvasCtx.lineTo(p1.x, p1.y)
                tmpCanvasCtx.stroke()
                return points
            }
        })(),
    },
    eraser: {
        init: ({
            canvas,
            canvasCtx,
            tmpCanvas,
            tmpCanvasCtx,
        }: BrushArgs): void => {
            canvasCtx.lineCap = 'round'
            canvasCtx.lineJoin = 'round'
            canvasCtx.globalCompositeOperation = 'destination-out'
        },
        draw: () => {},
    },
}
