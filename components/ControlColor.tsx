import { FunctionComponent, MouseEventHandler } from 'react'
import { Color } from 'types'
import { useDrawCanvasState, useDrawCanvasDispatch } from 'logic/useDrawCanvas'
import Typography from '@material-ui/core/Typography'
import ColorButton from './ColorButton'

const ControlColor: FunctionComponent = () => {
    const { activeColor } = useDrawCanvasState()
    const { setColor } = useDrawCanvasDispatch()

    const handleChangeColor = (
        color: Color
    ): MouseEventHandler<HTMLButtonElement> => () => {
        setColor(color)
    }
    return (
        <div>
            <Typography variant="body2">Choose Color</Typography>
            {Object.entries(Color).map(([name, color]) => (
                <ColorButton
                    isActive={activeColor === color}
                    onClick={handleChangeColor(color)}
                    key={name}
                    name={name}
                    color={color}
                />
            ))}
        </div>
    )
}

export default ControlColor
