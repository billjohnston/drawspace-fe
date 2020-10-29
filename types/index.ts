import { MouseEvent, TouchEvent } from 'react'

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
}

export interface Coords {
    x: number
    y: number
}

export interface DrawStep {
    color: Color
    points: Coords[]
}

export type MouseOrTouchEvent<T> = MouseEvent<T> | TouchEvent<T>
