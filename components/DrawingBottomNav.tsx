import { FunctionComponent, useState } from 'react'
import Drawer from '@material-ui/core/Drawer'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import PaletteIcon from '@material-ui/icons/Palette'
import BrushIcon from '@material-ui/icons/Brush'
import SaveIcon from '@material-ui/icons/Save'
import UndoIcon from '@material-ui/icons/Undo'
import RedoIcon from '@material-ui/icons/Redo'
import LineWeightIcon from '@material-ui/icons/LineWeight'
import { useDrawCanvasState, useDrawCanvasDispatch } from 'logic/useDrawCanvas'

import ControlColor from 'components/ControlColor'
import ControlLineWidth from 'components/ControlLineWidth'
import ControlBrush from 'components/ControlBrush'
import SaveDrawingDialog from 'components/SaveDrawingDialog'

const useStyles = makeStyles(({ spacing }) => ({
    bottomControls: {
        height: 54,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    drawer: {
        padding: spacing(2),
    },
}))

const DrawSidebar: FunctionComponent = () => {
    const classes = useStyles()
    const { canUndo, canRedo } = useDrawCanvasState()
    const { undo, redo } = useDrawCanvasDispatch()

    const [colorDrawerOpen, setColorDrawerOpen] = useState(false)
    const openColorDrawer = () => {
        setColorDrawerOpen(true)
    }
    const closeColorDrawer = () => {
        setColorDrawerOpen(false)
    }

    const [lineWidthDrawerOpen, setLineWidthDrawerOpen] = useState(false)
    const openLineWidthDrawer = () => {
        setLineWidthDrawerOpen(true)
    }
    const closeLineWidthDrawer = () => {
        setLineWidthDrawerOpen(false)
    }

    const [brushDrawerOpen, setBrushDrawerOpen] = useState(false)
    const openBrushDrawer = () => {
        setBrushDrawerOpen(true)
    }
    const closeBrushDrawer = () => {
        setBrushDrawerOpen(false)
    }

    return (
        <div className={classes.bottomControls}>
            <div>
                <IconButton onClick={openColorDrawer} aria-label="Palette">
                    <PaletteIcon />
                </IconButton>
            </div>
            <div>
                <IconButton
                    onClick={openLineWidthDrawer}
                    aria-label="LineWeight"
                >
                    <LineWeightIcon />
                </IconButton>
            </div>
            <div>
                <IconButton onClick={openBrushDrawer} aria-label="Brush">
                    <BrushIcon />
                </IconButton>
            </div>
            <div>
                <IconButton
                    disabled={Boolean(!canUndo)}
                    onClick={undo}
                    aria-label="Undo"
                >
                    <UndoIcon />
                </IconButton>
            </div>
            <div>
                <IconButton
                    disabled={Boolean(!canRedo)}
                    onClick={redo}
                    aria-label="Redo"
                >
                    <RedoIcon />
                </IconButton>
            </div>
            <div>
                <SaveDrawingDialog>
                    {({ canSave, handleSave }) => (
                        <IconButton
                            disabled={!canSave}
                            onClick={handleSave}
                            aria-label="Save"
                        >
                            <SaveIcon />
                        </IconButton>
                    )}
                </SaveDrawingDialog>
            </div>
            <Drawer
                anchor="bottom"
                open={colorDrawerOpen}
                onClose={closeColorDrawer}
            >
                <div className={classes.drawer}>
                    <ControlColor />
                </div>
            </Drawer>
            <Drawer
                anchor="bottom"
                open={lineWidthDrawerOpen}
                onClose={closeLineWidthDrawer}
            >
                <div className={classes.drawer}>
                    <ControlLineWidth />
                </div>
            </Drawer>
            <Drawer
                anchor="bottom"
                open={brushDrawerOpen}
                onClose={closeBrushDrawer}
            >
                <div className={classes.drawer}>
                    <ControlBrush />
                </div>
            </Drawer>
        </div>
    )
}

export default DrawSidebar
