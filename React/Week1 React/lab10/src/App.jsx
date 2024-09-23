import {useState, useEffect} from 'react'
import addConfetti from './AddConfetti';
import './App.css';

function App() {
  const [count, setCount] = useState(0)
  const [isConfettiEnabled, setIsConfettiEnabled] = useState(true)

  useEffect(() => {
    // This should run whenever "count" changes.
    if (isConfettiEnabled) {
      addConfetti({ text: count.toString() })
    }
  }, [count])

  return (
    <main>
      <h1>🎊 Confetti Counter</h1>

      <button onClick={() => setIsConfettiEnabled((prev) => !prev)}>
        Confetti: {isConfettiEnabled ? 'on' : 'off'}
      </button>

      <h2>{count}</h2>

      <button onClick={() => setCount((previous) => previous + 1)}>+1</button>
    </main>
  );
}

export default App;

