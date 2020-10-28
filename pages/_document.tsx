import { Children, ReactElement } from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/styles'
import theme from 'styles/theme'

export default class Doc extends Document {
    render(): ReactElement {
        return (
            <Html lang="en">
                <Head>
                    <meta
                        name="theme-color"
                        content={theme.palette.primary.main}
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                    <link rel="shortcut icon" href="/favicon.ico" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

Doc.getInitialProps = async (ctx) => {
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage
    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
        })
    const initialProps = await Document.getInitialProps(ctx)
    return {
        ...initialProps,
        styles: [
            ...Children.toArray(initialProps.styles),
            sheets.getStyleElement(),
        ],
    }
}
