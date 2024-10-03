import { useState } from 'hono/jsx'
import { render } from 'hono/jsx/dom'

function App() {
  return (
    <>
    <Counter />
    </>
  )
}

function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>You clicked me {count} times</button>
}

const root = document.getElementById('root')!
render(<App />, root)