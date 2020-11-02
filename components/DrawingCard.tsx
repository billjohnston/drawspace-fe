import { FunctionComponent } from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(({ spacing }) => ({
    tile: {
        width: '100%',
        height: '100%',
    },
    imageWrapper: {
        cursor: 'pointer',
        border: '2px solid #DDDDDD',
        '&:hover': {
            border: '2px solid #aaaaaa',
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
    },
}))

interface Props {
    id: string
    title: string
    thumbnailUrl: string
}
const DrawingCard: FunctionComponent<Props> = ({ id, title, thumbnailUrl }) => {
    const classes = useStyles()
    return (
        <div className={classes.tile}>
            <Link href={`/drawing-detail?id=${id}`}>
                <div className={classes.imageWrapper}>
                    <img
                        className={classes.image}
                        src={thumbnailUrl}
                        alt={title}
                    />
                    <div className={classes.imageInfo}>
                        <Typography variant="subtitle2">{title}</Typography>
                        <Typography variant="caption">by username</Typography>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default DrawingCard
