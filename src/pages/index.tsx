import ArticlePageView, { ArticlePageViewProps } from '@/features/prose/components/ArticlePageView'
import { getPageRepository } from '@/features/prose/services/getPageRepository'

export async function getStaticProps() {
  return getPageRepository().getStaticProps('index', 60 * 15)
}

export default function Page({ entry }: ArticlePageViewProps) {
  return <ArticlePageView className="homepage" entry={entry} />
}
