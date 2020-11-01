import { FunctionComponent, MouseEventHandler } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { Color } from 'types'

const useStyles = makeStyles({
    button: {
        padding: 16,
        margin: 2,
        border: '1px solid #888888',
        borderRadius: '50%',
    },
    buttonActive: {
        border: '1px solid green',
    },
})

const ColorButton: FunctionComponent<{
    isActive: boolean
    onClick: MouseEventHandler<HTMLButtonElement>
    color: Color
    name: string
}> = ({ onClick, color, name, isActive }) => {
    const classes = useStyles()
    return (
        <button
            className={clsx(classes.button, {
                [classes.buttonActive]: isActive,
            })}
            style={{ backgroundColor: color }}
            type="button"
            aria-label={`Change color ${name}`}
            onClick={onClick}
        />
    )
}

export default ColorButton
