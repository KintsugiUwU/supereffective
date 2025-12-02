import PageMeta from '@/features/prose/components/PageMeta'
import { ProfileView } from '@/features/users/components/ProfileView'
import { abs_url } from '@/lib/components/Links'

const Page = () => {
  return (
    <div className={'page-container'}>
      <PageMeta
        metaTitle={'Profile - PokéPC Classic'}
        metaDescription={''}
        robots={'noindex, nofollow'}
        canonicalUrl={abs_url('/profile')}
        lang={'en'}
      />
      <div className="page-container">
        <div className="bordered-container inner-container inner-blueberry">
          <ProfileView />
        </div>
      </div>
    </div>
  )
}

export default Page
