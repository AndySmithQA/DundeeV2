import './App.css';
import addConfetti from './AddConfetti';

function App() {
  return (
    <div className="App">
      <h1>The Confetti Button</h1>
      <button onClick={addConfetti}>Confetti Time!!</button>
    </div>
  );
}

export default App;
