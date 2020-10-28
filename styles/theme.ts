import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    overrides: {
        MuiCssBaseline: {
            '@global': {
                html: {
                    width: '100%',
                    height: '100%',
                    padding: 0,
                    margin: 0,
                },
                body: {
                    width: '100%',
                    height: '100%',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    position: 'fixed',
                },
                '#__next': {
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                },
            },
        },
    },
})

export default theme
