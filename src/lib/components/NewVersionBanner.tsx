import styles from './NewVersionBanner.module.css'

export const NewVersionBanner = ({ href, title }: { href: string; title: React.ReactNode }) => {
  return (
    <div className={styles.newVersionBanner}>
      <a href={href}>{title}</a>
    </div>
  )
}
