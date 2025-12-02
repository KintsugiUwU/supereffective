import Image from 'next/image'

import PageMeta from '@/features/prose/components/PageMeta'
import { abs_url } from '@/lib/components/Links'

const page = () => {
  const randFrom0to4 = Math.floor(Math.random() * 5)
  return (
    <div className={'page-container'}>
      <PageMeta
        metaTitle={'Under Maintenance'}
        metaDescription={'We&apos;ll be back soon!'}
        canonicalUrl={abs_url('/maintenance')}
        robots={'noindex, nofollow'}
        lang={'en'}
      />

      <article>
        <h2 style={{ textAlign: 'center' }}>
          Under Maintenance <small>We&apos;ll be back soon!</small>
        </h2>
        <section>
          <Image
            src={`/images/maintenance.gif`}
            style={{
              width: '100%',
              border: '8px solid rgba(0,0,0,0.2)',
              borderRadius: '50px',
            }}
            fill={true}
            alt={'Under Maintenance'}
          />
        </section>
      </article>
    </div>
  )
}

export default page
