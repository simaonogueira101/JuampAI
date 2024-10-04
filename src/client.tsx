import { useState } from 'hono/jsx'
import { render } from 'hono/jsx/dom'
import Navigo from 'navigo'

import { Navbar } from './components/Navbar'

import { AssistantPage } from './components/AssistantPage'
import { ConfigPage } from './components/ConfigPage'

const router = new Navigo('/')

function App() {
  const [currentRoute, setCurrentRoute] = useState('/')

  router
    .on('/', () => setCurrentRoute('/'))
    .on('/config', () => setCurrentRoute('/config'))
    .resolve()

  return (
    <div>
      <Navbar />

      {currentRoute === '/' && <AssistantPage />}
      {currentRoute === '/config' && <ConfigPage />}
    </div>
  )
}

const root = document.getElementById('root')
render(<App />, root!)

router.updatePageLinks()