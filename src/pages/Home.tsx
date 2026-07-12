import { FloatingHero } from '../components/hero/FloatingHero'
import { About } from '../sections/About'
import { Contact } from '../sections/Contact'
import { Publications } from '../sections/Publications'
import { Research } from '../sections/Research'
import { Service } from '../sections/Service'
import { Skills } from '../sections/Skills'

export function Home() {
  return (
    <main>
      <FloatingHero />
      <About />
      <Research />
      <Publications />
      <Skills />
      <Service />
      <Contact />
    </main>
  )
}
