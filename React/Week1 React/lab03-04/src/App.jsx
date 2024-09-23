import Card from './components/Card';
import './App.css';

function App() {
  return (
    <div className="App">
      <p><Card name="Bill" age="35" role="DevOps" isActive={true} /></p>
      <p><Card name="Andy" age="27" role="Sales" isActive={false}/></p>
      <p><Card name="Dave" age="64" role="Catering" isActive={true}/></p>
    </div>
  );
}
export default App;
