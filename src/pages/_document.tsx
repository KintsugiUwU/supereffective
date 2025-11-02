import Document, { Head, Html, Main, NextScript } from 'next/document'

import DocumentHeadContent from '@/lib/components/layout/DocumentHeadContent'

class RootDocument extends Document {
  render() {
    return (
      <Html lang={'en'}>
        <Head>
          <DocumentHeadContent />
          {/* Plausible Analytics (Self-hosted): */}
          <script defer data-domain="classic.pokepc.net" src="https://ua.werkowl.com/js/script.js" />
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
