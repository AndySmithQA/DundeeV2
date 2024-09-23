import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { CartProvider } from "./context/cart"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import ItemsPage from "./pages/ItemsPage"
import CheckoutPage from "./pages/CheckoutPage"


function App() {
  const [itemsData, setItemsData] = useState([])

  useEffect(() => {
    fetch('https://seed-theory-api.netlify.app/data.json')
      .then((response) => response.json())
      .then((data) => setItemsData(data))
  }, [])

  return (
    <CartProvider itemsData={itemsData}>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/items" element={<ItemsPage itemsData={itemsData} />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
