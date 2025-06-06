import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="es">
            <Head>
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#8b5cf6" />
                <link rel="icon" href="/icons/icon-192.png" />
                <link rel="apple-touch-icon" href="/icons/icon-192.png" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
