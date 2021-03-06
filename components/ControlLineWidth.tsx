import { FunctionComponent, ChangeEvent } from 'react'
import { useDrawCanvasState, useDrawCanvasDispatch } from 'logic/useDrawCanvas'
import Slider from '@material-ui/core/Slider'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(({ spacing }) => ({
    sliderWrapper: {
        padding: spacing(1),
    },
}))

const max = 20
const step = 2

const marks = Array.from({ length: max / step }, (x, i: number) => ({
    value: i * step + step,
    label: i * step + step,
}))

const ControlLineWidth: FunctionComponent = () => {
    const classes = useStyles()
    const { activeLineWidth } = useDrawCanvasState()
    const { setLineWidth } = useDrawCanvasDispatch()

    const handleChange = (e: ChangeEvent, value: number) => {
        setLineWidth(value)
    }

    return (
        <div>
            <Typography variant="body2">Choose Line Width</Typography>

            <div className={classes.sliderWrapper}>
                <Slider
                    step={step}
                    min={step}
                    max={max}
                    marks={marks}
                    value={activeLineWidth}
                    onChange={handleChange}
                    aria-label="Change line width"
                />
            </div>
        </div>
    )
}

export default ControlLineWidth
