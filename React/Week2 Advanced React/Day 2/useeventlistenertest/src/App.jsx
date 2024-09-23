import useEventListener from './useEventListener'
import { useState } from 'react'
import './App.css'

function App() {

  const [element, setElement] = useState('img')
  
  function handle() {
    useEventListener(element)
  }

  return (
    <>
      <div className="element">
            <h1>useEventListener</h1>
            <p>If you click the picture first, nothing will happen. Click the add listener button, then click it again</p>
            <img src="https://picsum.photos/200" alt="random" />
        </div>
      <button onClick={handle}>Add Listener</button>
    </>
  )
}

export default App
