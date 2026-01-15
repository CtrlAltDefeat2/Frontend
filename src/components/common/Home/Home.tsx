import Link from 'next/link'
import { toast } from 'sonner'
import { Sparkles } from 'lucide-react'
import PlaylistCard from '@/components/ui/PlaylistCard/PlaylistCard'
import { initiateSpotifyLogin } from '@/lib/api/spotify-login'
import { HOME_CONSTANTS } from '@/resources/resources'
import { homeStyles } from './Home.styles'
import { FeatureProps } from './Home.types'
import { Card, CardContent } from '@/components/ui/Card/Card'
import { Button } from '@/components/ui/Button/Button'

export default function Home() {
  const handleSpotifyLogin: () => void = () => {
    try {
      initiateSpotifyLogin()
    } catch (error) {
      console.error('Spotify login error:', error)
      toast.error(HOME_CONSTANTS.TOAST_MESSAGES.LOGIN_ERROR.TITLE, {
        description: HOME_CONSTANTS.TOAST_MESSAGES.LOGIN_ERROR.DESCRIPTION,
      })
    }
  }

  const handleDemoClick: () => void = () => {
    toast(HOME_CONSTANTS.TOAST_MESSAGES.DEMO_MODE.TITLE, {
      description: HOME_CONSTANTS.TOAST_MESSAGES.DEMO_MODE.DESCRIPTION,
    })
  }

  return (
    <main className={homeStyles.main}>
      {/* HERO */}
      <section className={homeStyles.hero.section}>
        <div className={homeStyles.hero.grid}>
          <div className={homeStyles.hero.content.wrapper}>
            <span className={homeStyles.hero.content.badge}>{HOME_CONSTANTS.TEXTS.HERO.BADGE}</span>

            <h1 className={homeStyles.hero.content.title}>
              {HOME_CONSTANTS.TEXTS.HERO.TITLE.LINE_1}
              <br className={homeStyles.hero.content.titleBreak} />
              {HOME_CONSTANTS.TEXTS.HERO.TITLE.LINE_2}
              <span className={homeStyles.hero.content.titleHighlight}>
                {HOME_CONSTANTS.TEXTS.HERO.TITLE.HIGHLIGHT}
              </span>
            </h1>

            <p className={homeStyles.hero.content.description}>
              {HOME_CONSTANTS.TEXTS.HERO.DESCRIPTION}
            </p>

            <div className={homeStyles.hero.content.actions}>
              <Button size="lg" className="px-6" onClick={handleSpotifyLogin}>
                {HOME_CONSTANTS.TEXTS.HERO.BUTTONS.PRIMARY}
              </Button>

              <Button variant="outline" size="lg" onClick={handleDemoClick}>
                {HOME_CONSTANTS.TEXTS.HERO.BUTTONS.SECONDARY}
              </Button>
            </div>

            <ul className={homeStyles.hero.content.features}>
              {HOME_CONSTANTS.TEXTS.HERO.FEATURES.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className={homeStyles.hero.preview.wrapper}>
            <div className={homeStyles.hero.preview.card}>
              <div className={homeStyles.hero.preview.grid}>
                {HOME_CONSTANTS.MOCK_PLAYLISTS.map((playlist, index) => (
                  <PlaylistCard
                    key={index}
                    playlist={{
                      id: '',
                      name: playlist.name,
                      image: playlist.image,
                      tracksTotal: playlist.tracksTotal,
                      tracksLink: '',
                    }}
                  />
                ))}
              </div>

              <div className={homeStyles.hero.preview.actionBar}>
                <Button
                  onClick={() => (window.location.href = HOME_CONSTANTS.ROUTES.DASHBOARD)}
                  className={homeStyles.hero.preview.button}
                >
                  <span className={homeStyles.hero.preview.buttonContent}>
                    <Sparkles className={homeStyles.hero.preview.buttonIcon} />
                    {HOME_CONSTANTS.TEXTS.HERO.PREVIEW.BUTTON}
                  </span>
                </Button>
                <span className={homeStyles.hero.preview.buttonText}>
                  {HOME_CONSTANTS.TEXTS.HERO.PREVIEW.INFO}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className={homeStyles.features.section}>
        <div className={homeStyles.features.grid}>
          {HOME_CONSTANTS.TEXTS.FEATURES.map((feature, index) => (
            <Feature key={index} title={feature.title} desc={feature.desc} />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className={homeStyles.howItWorks.section}>
        <h2 className={homeStyles.howItWorks.title}>{HOME_CONSTANTS.TEXTS.HOW_IT_WORKS.TITLE}</h2>
        <ol className={homeStyles.howItWorks.grid}>
          {HOME_CONSTANTS.TEXTS.HOW_IT_WORKS.STEPS.map((step, index) => (
            <Card key={index} className={homeStyles.howItWorks.card.wrapper}>
              <CardContent className={homeStyles.howItWorks.card.content}>
                <div className={homeStyles.howItWorks.card.badge}>{index + 1}</div>
                <div className={homeStyles.howItWorks.card.title}>{step.title}</div>
                <p className={homeStyles.howItWorks.card.description}>{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className={homeStyles.cta.section}>
        <div className={homeStyles.cta.wrapper}>
          <h3 className={homeStyles.cta.title}>{HOME_CONSTANTS.TEXTS.CTA.TITLE}</h3>
          <p className={homeStyles.cta.description}>{HOME_CONSTANTS.TEXTS.CTA.DESCRIPTION}</p>
          <div className={homeStyles.cta.actions}>
            <Link href={HOME_CONSTANTS.ROUTES.DASHBOARD}>
              <Button size="lg" className={homeStyles.cta.button}>
                {HOME_CONSTANTS.TEXTS.CTA.BUTTON}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function Feature({ title, desc }: FeatureProps) {
  return (
    <Card className={homeStyles.features.card.wrapper}>
      <CardContent className={homeStyles.features.card.content}>
        <div className={homeStyles.features.card.title}>{title}</div>
        <p className={homeStyles.features.card.description}>{desc}</p>
      </CardContent>
    </Card>
  )
}
