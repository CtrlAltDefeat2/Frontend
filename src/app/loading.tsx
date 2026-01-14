import { LOADING_CONSTANTS } from '@/resources/resources'
import { loadingStyles } from '../components/styles/loading.styles'

export default function Loading() {
  return (
    <main className={loadingStyles.main}>
      <div className={loadingStyles.spinner.wrapper}>
        <div className={loadingStyles.spinner.element} />
      </div>

      <h2 className={loadingStyles.title}>{LOADING_CONSTANTS.TEXTS.TITLE}</h2>

      <p className={loadingStyles.description}>{LOADING_CONSTANTS.TEXTS.DESCRIPTION}</p>

      <div className={loadingStyles.skeleton.grid}>
        {Array.from({ length: LOADING_CONSTANTS.SKELETON_COUNT }).map((_, i) => (
          <div key={i} className={loadingStyles.skeleton.card}>
            <div className={loadingStyles.skeleton.image} />
            <div className={loadingStyles.skeleton.text} />
          </div>
        ))}
      </div>
    </main>
  )
}
