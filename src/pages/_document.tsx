import Document, { Head, Html, Main, NextScript } from 'next/document'

import DocumentHeadContent from '@/lib/components/layout/DocumentHeadContent'

class RootDocument extends Document {
  render() {
    return (
      <Html lang={'en'}>
        <Head>
          <DocumentHeadContent />
          <script
            defer
            data-domain="classic.pokepc.net"
            src="https://plausible.services.eonpixel.app/js/script.pageview-props.tagged-events.js"
          />
          <script
            defer
            src="https://umami.services.eonpixel.app/script.js"
            data-website-id="9e305fb4-67c0-4357-b0d3-f94cc351137e"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default RootDocument
