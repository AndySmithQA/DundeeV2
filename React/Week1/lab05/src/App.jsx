import ItemCard from './components/items';
import itemsData from './itemsData.json';
import './App.css';

function App() {

  return (
    <div className="App">
      <main>
        <h1>React Fruit Market</h1>
        <div className="items-grid">
          {itemsData.map((item) => (
            <ItemCard 
            key={item.id}
            symbol={item.symbol}
            name={item.name}
            price={item.price}
            />
          ))}
        </div>
      </main>
    </div>
  
  );
}

export default App;
