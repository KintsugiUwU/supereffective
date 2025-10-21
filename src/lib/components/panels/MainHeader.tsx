import { useRouter } from 'next/compat/router'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import config from '@/config'
import { UserTrayView } from '@/features/users/views/UserTrayView'

import { HandHeartIcon } from 'lucide-react'
import { SiteLink } from '../Links'
import { PokedexIcon } from '../icons/icons'
import { BlueskyLinkIcon, DiscordLinkIcon } from '../icons/icons-links'
import styles from './MainHeader.module.css'

export default function MainHeader() {
  const router = useRouter()
  const pageSrc = router ? (Array.isArray(router.query.s) ? router.query.s[0] : router.query.s) : ''

  const [navbarOpen, setNavbarOpen] = useState(false)

  const handleToggle = () => {
    setNavbarOpen((prev) => !prev)
  }

  return (
    <>
      <div className={styles.header + (navbarOpen ? ' ' + styles.open : '')}>
        <div className={styles.headerTop}>
          <Link href="/" className={styles.headerLogo} tabIndex={0} title={config.texts.siteName}>
            <Image src="/images/logo/icon.svg" width="72" height="72" alt={config.texts.siteName} />
            <h1 className="sr-only">
              {config.texts.siteName}
              <small>.gg</small>
            </h1>
          </Link>

          <nav tabIndex={0} className={styles.menu + (navbarOpen ? ' ' + styles.open : '')}>
            <SiteLink activeClass={styles.active} tabIndex={1} href="/apps/pokedex">
              <PokedexIcon width={24} height={24} style={{ marginRight: '0.5rem' }} />
              Pokédex
            </SiteLink>
            <SiteLink activeClass={styles.active} tabIndex={2} href="/apps/livingdex">
              <i className={'icon-pkg-box margin-r icon--2x'} /> Livingdex
            </SiteLink>
            <a title="PokéPC - SuperEffective's successor" tabIndex={2} href="https://pokepc.net/?ref=supereffective">
              <i style={{ color: 'cyan', marginRight: '4px' }} className={'icon-pkg-shiny icon--2x'} /> PokéPC{' '}
              <sup style={{ color: 'cyan', marginLeft: '4px' }}>NEW</sup>
            </a>
            <DiscordLinkIcon className={styles.brandLink} tabIndex={4}>
              <span className="mobile-only">Discord</span>
            </DiscordLinkIcon>
            <BlueskyLinkIcon className={styles.brandLink} tabIndex={3}>
              <span className="mobile-only">Bluesky</span>
            </BlueskyLinkIcon>
            <SiteLink
              // className={styles.donateBtn}
              activeClass={styles.active}
              href="/donate"
              tabIndex={5}
              title={'Donate to help this site'}
            >
              <i title="Support Us / Donations">
                <HandHeartIcon width={24} height={24} />
              </i>
              <span className={'mobile-only'}>Support Us</span>
            </SiteLink>
            <UserTrayView activeClass={styles.active} returnUrl={pageSrc} />
          </nav>

          <span className={styles.menuToggle} onClick={handleToggle} role="button" title="Menu" tabIndex={6}>
            <Image src={'/images/menu-dots.png'} alt="..." fill={true} />
          </span>
        </div>
      </div>
      {navbarOpen && (
        <div
          className={styles.navbarOpenOverlay}
          onClick={() => {
            setNavbarOpen(false)
          }}
        />
      )}
    </>
  )
}
