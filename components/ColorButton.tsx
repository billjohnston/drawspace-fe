import { FunctionComponent, MouseEventHandler } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { Color } from 'types'

const useStyles = makeStyles(({ palette }) => ({
    button: {
        padding: 16,
        margin: 2,
        borderRadius: '50%',
    },
    buttonActive: {
        border: `2px solid #ff1744`,
    },
    buttonInActive: {
        border: `2px solid ${palette.grey.A100}`,
    },
}))

const ColorButton: FunctionComponent<{
    isActive: boolean
    onClick: MouseEventHandler<HTMLButtonElement>
    color: Color
    name: string
    disabled?: boolean
}> = ({ onClick, color, name, isActive }) => {
    const classes = useStyles()
    return (
        <button
            className={clsx(classes.button, {
                [classes.buttonActive]: isActive,
                [classes.buttonInActive]: !isActive,
            })}
            style={{ backgroundColor: color }}
            type="button"
            aria-label={`Change color ${name}`}
            onClick={onClick}
        />
    )
}

export default ColorButton
