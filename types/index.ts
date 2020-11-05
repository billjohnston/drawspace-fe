export enum ButtonType {
    SUBMIT = 'submit',
    BUTTON = 'button',
}

export enum TextFieldType {
    TEXT = 'text',
    PASSWORD = 'password',
    EMAIL = 'email',
    NUMBER = 'number',
}

export enum Color {
    VIOLET = '#9400D3',
    INDIGO = '#4B0082',
    BLUE = '#0000FF',
    GREEN = '#00FF00',
    YELLOW = '#FFFF00',
    ORANGE = '#FF7F00',
    RED = '#FF0000',
    BLACK = '#000000',
    WHITE = '#FFFFFF',
    GREY = '#808080',
}

export enum Brush {
    PENCIL,
    ERASER,
    CIRCLES,
}

export interface Coords {
    x: number
    y: number
    rand?: number
    scaledRand?: number
}

export interface DrawStack {
    color: Color
    lineWidth: number
    brush: Brush
    points: Coords[]
}

// FORM
export interface StepFormComponentProps {
    goToNextStep: () => void
    goBackStep: () => void
    setOpen: () => void
    setClosed: () => void
    handleLogin: () => void
    handleSignUp: () => void
    isSaveDialog: boolean
}

export interface FormError {
    fieldErrors: {
        [key: string]: string
    }
}

export type FormResponse<TSuccess> = TSuccess | FormError

export interface CreateDrawingFormData {
    title: string
    publish: boolean
}

// Ajax / API
export interface ApiListResult<TEntity> {
    items: TEntity[]
    nextStartKey: string
}

export interface ApiError {
    statusCode: number
    message: string
}

export enum HttpMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export enum Credentials {
    SAME_ORIGIN = 'same-origin',
    INCLUDE = 'include',
    OMIT = 'omit',
}

// Entities
export interface User {
    id: string
    name: string
    privateDrawingCount: number
    publicDrawingCount: number
    created: string
    modified: string
}

export interface Drawing {
    id: string
    title: string
    published: string
    thumbnailUrl: string
    drawStepsUrl: string
    startTime: string
    endTime: string
    width: number
    height: number
    resolution: number
    user: string
    created: string
    modified: string
}

export type UserPopulatedDrawing = Omit<Drawing, 'user'> & {
    user: User
}
