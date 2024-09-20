import { useState } from 'react';
import CounterDisplay from './components/CounterDisplay';
import ResetButton from './components/ResetButton';
import IncrementButton from './components/IncrementButton';
import './App.css';

export default function App() {
  const [count, setCount] = useState(0)

  function handleIncrement() {
    setCount((previous) => previous + 1)
  }

  function handleReset() {
    setCount(0)
  }

  return (
    <main>
      <CounterDisplay count={count} />
      <IncrementButton increment={handleIncrement} /> &nbsp;
      <ResetButton reset={handleReset} />
    </main>
  )
}
