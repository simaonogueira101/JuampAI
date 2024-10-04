import { useState } from 'hono/jsx'
import { render } from 'hono/jsx/dom'
import Navigo from 'navigo'

import { Layout } from './components/Layout'
import { Navbar } from './components/Navbar'

import { Assistant } from './views/Assistant'
import { Config } from './views/Config'

const router = new Navigo('/')

function App() {
  const [currentRoute, setCurrentRoute] = useState('/')

  router
    .on('/', () => setCurrentRoute('/'))
    .on('/config', () => setCurrentRoute('/config'))
    .resolve()

  return (
    <Layout>
      <Navbar />

      {currentRoute === '/' && <Assistant />}
      {currentRoute === '/config' && <Config />}
    </Layout>
  )
}

const root = document.getElementById('root')
render(<App />, root!)

router.updatePageLinks()