import { Color, Coords, Brush, DrawStack } from 'types'

const midPointBtw = (p1: Coords, p2: Coords): Coords => {
    return {
        x: p1.x + (p2.x - p1.x) / 2,
        y: p1.y + (p2.y - p1.y) / 2,
    }
}

export const initCanvas = (
    canvasEl: HTMLCanvasElement,
    tmpCanvasEl: HTMLCanvasElement
): [CanvasRenderingContext2D, CanvasRenderingContext2D] => {
    /* eslint-disable no-param-reassign */
    const width = canvasEl.offsetWidth
    const height = canvasEl.offsetHeight
    canvasEl.width = width * devicePixelRatio
    canvasEl.height = height * devicePixelRatio
    tmpCanvasEl.width = width * devicePixelRatio
    tmpCanvasEl.height = height * devicePixelRatio
    /* eslint-enable */

    const ctx = canvasEl.getContext('2d')
    ctx.scale(devicePixelRatio, devicePixelRatio)

    const tmpCtx = tmpCanvasEl.getContext('2d')
    tmpCtx.scale(devicePixelRatio, devicePixelRatio)
    return [ctx, tmpCtx]
}

const clearCanvas = (context: CanvasRenderingContext2D) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
}

const copyToCanvas = (
    canvasContext: CanvasRenderingContext2D,
    tmpContext: CanvasRenderingContext2D
) => {
    canvasContext.drawImage(
        tmpContext.canvas,
        0,
        0,
        canvasContext.canvas.width / 2,
        canvasContext.canvas.height / 2
    )
}

const pencilBrush = {
    startStroke: (
        context: CanvasRenderingContext2D,
        lineWidth: number,
        color: Color
    ): void => {
        context.lineCap = 'round'
        context.lineJoin = 'round'
        context.lineWidth = lineWidth
        context.strokeStyle = color
        context.fillStyle = color
    },
    drawStroke: (context: CanvasRenderingContext2D, points: Coords[]): void => {
        clearCanvas(context)

        let p1 = points[0]
        let p2 = points[1]

        context.beginPath()
        context.moveTo(p1.x, p1.y)
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i < points.length - 2; i++) {
            const midPoint = midPointBtw(p1, p2)
            context.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y)
            p1 = points[i]
            p2 = points[i + 1]
        }

        context.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y)
        context.stroke()
    },
    endStroke: (
        context: CanvasRenderingContext2D,
        tmpContext: CanvasRenderingContext2D,
        points: Coords[]
    ): void => {
        // dots
        if (points.length === 1) {
            const p1 = points[0]
            tmpContext.beginPath()
            tmpContext.arc(
                p1.x,
                p1.y,
                tmpContext.lineWidth / 2,
                0,
                2 * Math.PI,
                false
            )
            tmpContext.fill()
            tmpContext.closePath()
        }
        copyToCanvas(context, tmpContext)
        clearCanvas(tmpContext)
    },
}

const eraserBrush = {
    startStroke: (
        context: CanvasRenderingContext2D,
        lineWidth: number
    ): void => {
        pencilBrush.startStroke(context, lineWidth, Color.WHITE)
    },
    drawStroke: pencilBrush.drawStroke,
    endStroke: (
        context: CanvasRenderingContext2D,
        tmpContext: CanvasRenderingContext2D,
        points: Coords[]
    ): void => {
        context.globalCompositeOperation = 'destination-out'
        pencilBrush.endStroke(context, tmpContext, points)
        context.globalCompositeOperation = 'source-over'
    },
}

export const brushes = {
    [Brush.PENCIL]: pencilBrush,
    [Brush.ERASER]: eraserBrush,
}

export const redraw = (
    context: CanvasRenderingContext2D,
    tmpContext: CanvasRenderingContext2D,
    drawStack: DrawStack[]
): void => {
    clearCanvas(context)
    drawStack.forEach(({ brush, color, lineWidth, points }) => {
        brushes[brush].startStroke(tmpContext, lineWidth, color)
        if (points.length > 1) {
            brushes[brush].drawStroke(tmpContext, points)
        }
        brushes[brush].endStroke(context, tmpContext, points)
    })
}

export const createThumbnail = (
    context: CanvasRenderingContext2D,
    size: number
): Promise<Blob> =>
    new Promise((resolve) => {
        const thumbnailCanvas = document.createElement('canvas')
        thumbnailCanvas.style.width = `${size}px`
        thumbnailCanvas.style.height = `${size}px`
        thumbnailCanvas.width = size * devicePixelRatio
        thumbnailCanvas.height = size * devicePixelRatio
        const thumbnailContext = thumbnailCanvas.getContext('2d')
        const imageWidth = context.canvas.width / devicePixelRatio
        const imageHeight = context.canvas.height / devicePixelRatio
        const aspectHeight = (imageHeight * size) / imageWidth
        const yOffset = (size - aspectHeight) / 2
        thumbnailContext.drawImage(
            context.canvas,
            0,
            yOffset * 2,
            size * 2,
            aspectHeight * 2
        )
        thumbnailContext.canvas.toBlob((blob) => {
            resolve(blob)
        })
    })
