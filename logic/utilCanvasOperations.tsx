import { Color, Coords, Brush, DrawStack } from 'types'

const midPointBtw = (p1: Coords, p2: Coords): Coords => {
    return {
        x: p1.x + (p2.x - p1.x) / 2,
        y: p1.y + (p2.y - p1.y) / 2,
    }
}

export const initCanvas = (
    canvasEl: HTMLCanvasElement
): CanvasRenderingContext2D => {
    /* eslint-disable no-param-reassign */
    // canvasEl.style.width = `${canvasEl.parentElement.offsetWidth}px`
    // canvasEl.style.height = `${canvasEl.parentElement.offsetHeight}px`
    // canvasEl.width = canvasEl.parentElement.offsetWidth * devicePixelRatio
    // canvasEl.height = canvasEl.parentElement.offsetHeight * devicePixelRatio
    /* eslint-enable */

    const context = canvasEl.getContext('2d')
    context.scale(devicePixelRatio, devicePixelRatio)
    return context
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
        canvasContext.canvas.width / devicePixelRatio,
        canvasContext.canvas.height / devicePixelRatio
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
    },
    drawStroke: (context: CanvasRenderingContext2D, points: Coords[]): void => {
        clearCanvas(context)

        let p1 = points[0]
        let p2 = points[1]

        context.beginPath()
        context.moveTo(p1.x, p1.y)
        points.forEach((x, i) => {
            const midPoint = midPointBtw(p1, p2)
            context.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y)
            p1 = points[i]
            p2 = points[i + 1]
        })

        context.lineTo(p1.x, p1.y)
        context.stroke()
    },
    endStroke: (
        context: CanvasRenderingContext2D,
        tmpContext: CanvasRenderingContext2D
    ): void => {
        copyToCanvas(context, tmpContext)
        clearCanvas(tmpContext)
    },
}

const eraserBrush = {
    startStroke: (
        context: CanvasRenderingContext2D,
        lineWidth: number,
        color: Color
    ): void => {
        pencilBrush.startStroke(context, lineWidth, color)
        context.strokeStyle = Color.WHITE
    },
    drawStroke: pencilBrush.drawStroke,
    endStroke: (
        context: CanvasRenderingContext2D,
        tmpContext: CanvasRenderingContext2D
    ): void => {
        context.globalCompositeOperation = 'destination-out'
        pencilBrush.endStroke(context, tmpContext)
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
        brushes[brush].drawStroke(tmpContext, points)
        brushes[brush].endStroke(context, tmpContext)
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
