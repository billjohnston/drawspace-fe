import { FunctionComponent, ChangeEvent } from 'react'
import { useDrawCanvasState, useDrawCanvasDispatch } from 'logic/useDrawCanvas'
import Slider from '@material-ui/core/Slider'

const max = 20
const step = 2

const marks = Array.from({ length: max / step }, (x, i: number) => ({
    value: i * step + step,
    label: i * step + step,
}))

const ControlColor: FunctionComponent = () => {
    const { activeLineWidth } = useDrawCanvasState()
    const { setLineWidth } = useDrawCanvasDispatch()

    const handleChange = (e: ChangeEvent, value: number) => {
        setLineWidth(value)
    }

    return (
        <Slider
            step={step}
            min={step}
            max={max}
            marks={marks}
            value={activeLineWidth}
            onChange={handleChange}
            aria-label="Change line width"
        />
    )
}

export default ControlColor
