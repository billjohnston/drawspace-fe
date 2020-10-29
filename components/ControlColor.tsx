import { FunctionComponent, MouseEventHandler } from 'react'
import { Color } from 'types'
import { useDrawCanvasState, useDrawCanvasDispatch } from 'logic/useDrawCanvas'
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
        <>
            {Object.entries(Color).map(([name, color]) => (
                <ColorButton
                    isActive={activeColor === color}
                    onClick={handleChangeColor(color)}
                    key={name}
                    name={name}
                    color={color}
                />
            ))}
        </>
    )
}

export default ControlColor
