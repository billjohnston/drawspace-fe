import { FunctionComponent } from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { User } from 'types'

const useStyles = makeStyles(({ spacing, palette }) => ({
    tile: {
        width: '100%',
        height: '100%',
    },
    imageWrapper: {
        cursor: 'pointer',
        '&:hover': {
            border: `2px solid ${palette.grey}`,
        },
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageInfo: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#FFFFFF',
        position: 'absolute',
        height: 60,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        padding: spacing(1),
        '& > h6': {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        '& > span': {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
    },
}))

interface Props {
    href: string
    imageUrl: string
    title: string
    subTitle: string
}
const DrawingCard: FunctionComponent<Props> = ({
    href,
    imageUrl,
    title,
    subTitle,
}) => {
    const classes = useStyles()
    return (
        <div className={classes.tile}>
            <Paper elevation={2}>
                <Link href={href}>
                    <div className={classes.imageWrapper}>
                        <img
                            className={classes.image}
                            src={imageUrl}
                            alt={title}
                        />
                        <div className={classes.imageInfo}>
                            <Typography variant="subtitle2">{title}</Typography>
                            <Typography variant="caption">
                                {subTitle}
                            </Typography>
                        </div>
                    </div>
                </Link>
            </Paper>
        </div>
    )
}

export default DrawingCard
