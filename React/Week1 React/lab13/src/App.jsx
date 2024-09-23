import CartList from './components/CartList'
import ItemsList from './components/ItemsList'
import { CartProvider } from './context/cart-context'
import './style.css'

export default function App() {
  return (
    <main>
      <h1>React Fruit Market</h1>
      <CartProvider>
        <CartList />
        <ItemsList />
      </CartProvider>
    </main>
  )
}