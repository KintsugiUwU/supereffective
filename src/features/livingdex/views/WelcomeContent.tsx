import { legacyCanCreateMoreDexes } from '@/features/livingdex/repository'
import { ButtonInternalLink } from '@/lib/components/Button'
import { useScrollToLocation } from '@/lib/hooks/useScrollToLocation'

export const WelcomeContent = ({ showDescription }: { showDescription?: boolean }) => {
  useScrollToLocation()

  const canAddMoreDexes = legacyCanCreateMoreDexes()

  return (
    <>
      {showDescription && (
        <div className={'bordered-container inner-container inner-blueberry'}>
          <article className={'inner-container-hero'}>
            <h2>
              <i className={'icon-pkg-box-home'} /> Livingdex Tracker
            </h2>
            Track your Livingdex for any game and share your progress in your social media with{' '}
            <b>PokéPC Classic's Dex Tracker</b>. You will be able to track your progress for all <b>main series</b>{' '}
            games (up to Gen 9) as well as for <b>Pokémon GO</b> and <b>Pokémon HOME</b>.
            <br />
            <br />A visual guide will also help you organize your Pokémon Boxes in an effective and understandable way.
            If you are looking for a way to quickly check which Pokémon you are missing and for which games, this is
            your website.
            <br /> <br />
            <div className="flex-preset-1">
              {canAddMoreDexes && (
                <ButtonInternalLink href={'/apps/livingdex/new'} rel="nofollow" style={{ fontSize: '1rem' }}>
                  <i className={'icon-pkg-box-home'} />
                  Start a new Livingdex
                </ButtonInternalLink>
              )}
              <ButtonInternalLink inverted href={'/apps/livingdex/national'} style={{ fontSize: '1rem' }}>
                National Livingdex Guide
              </ButtonInternalLink>
            </div>
            <br />
            <p>
              If you only need a visual reference for all storable Pokémon available for Pokémon HOME, you can use our{' '}
              National Livingdex Guide, which doesn't require any account or login.
            </p>
          </article>
        </div>
      )}
    </>
  )
}
