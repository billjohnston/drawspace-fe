import { FunctionComponent, MouseEvent } from 'react'
import { useDrawCanvasState, useDrawCanvasDispatch } from 'logic/useDrawCanvas'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import BrushIcon from '@material-ui/icons/Brush'
import CreateIcon from '@material-ui/icons/Create'
import EraserIcon from 'components/EraserIcon'
import { makeStyles } from '@material-ui/core/styles'

import { Brush } from 'types'

const useStyles = makeStyles({
    brushControlWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

const brushIconMap = {
    [Brush.PENCIL]: <CreateIcon />,
    [Brush.ERASER]: <EraserIcon />,
    [Brush.PAINT_BRUSH]: <BrushIcon />,
}

const brushValueArray = Array.from(
    { length: Object.keys(Brush).length / 2 },
    (x, i) => i
)

const ControlBrush: FunctionComponent = () => {
    const classes = useStyles()
    const { activeBrush } = useDrawCanvasState()
    const { setBrush } = useDrawCanvasDispatch()

    const handleChange = (e: MouseEvent<HTMLElement>, value: number) => {
        setBrush(value)
    }

    return (
        <div className={classes.brushControlWrapper}>
            <ToggleButtonGroup
                value={activeBrush}
                onChange={handleChange}
                aria-label="Change brush"
                exclusive
            >
                {brushValueArray.map((brushIndex) => (
                    <ToggleButton
                        key={brushIndex}
                        value={brushIndex}
                        aria-label={Brush[brushIndex]}
                    >
                        {brushIconMap[brushIndex]}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </div>
    )
}

export default ControlBrush
