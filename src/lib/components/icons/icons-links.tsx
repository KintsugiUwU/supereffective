import config from '@/config'
import { PropsOf } from '@/lib/utils/types'

import { ExternLink } from '../Links'
import { BlueskyIcon, DiscordIcon, GithubIcon } from './icons-brands'

export function BlueskyLinkIcon({
  className,
  children,
  ...rest
}: {
  className?: string
  children?: any
} & PropsOf<'a'>) {
  return (
    <ExternLink href={config.links.bluesky} title="Bluesky" {...rest}>
      <BlueskyIcon width={22} height={22} />
      {children}
    </ExternLink>
  )
}

export function DiscordLinkIcon({
  className,
  children,
  ...rest
}: {
  className?: string
  children?: any
} & PropsOf<'a'>) {
  return (
    <ExternLink href={config.links.discord} title="Discord" {...rest}>
      <DiscordIcon width={22} height={22} />
      {children}
    </ExternLink>
  )
}

export function GithubLinkIcon({
  className,
  children,
  ...rest
}: {
  className?: string
  children?: any
} & PropsOf<'a'>) {
  return (
    <ExternLink href={config.links.github_org} title="Github" {...rest}>
      <GithubIcon width={22} height={22} />
      {children}
    </ExternLink>
  )
}
