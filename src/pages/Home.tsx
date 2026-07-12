import { FloatingHero } from '../components/hero/FloatingHero'
import { About } from '../sections/About'
import { Awards } from '../sections/Awards'
import { Contact } from '../sections/Contact'
import { Publications } from '../sections/Publications'
import { Research } from '../sections/Research'
import { Skills } from '../sections/Skills'

export function Home() {
  return (
    <main>
      <FloatingHero />
      <About />
      <Research />
      <Publications />
      <Awards />
      <Skills />
      <Contact />
    </main>
  )
}
