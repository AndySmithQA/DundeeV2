import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import ItemsPage from "./pages/ItemsPage"



function App() {
  const [itemsData, setItemsData] = useState([])

  useEffect(() => {
    fetch('https://seed-theory-api.netlify.app/data.json')
      .then((response) => response.json())
      .then((data) => setItemsData(data))
  }, [])

  return (

      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/items" element={<ItemsPage itemsData={itemsData} />} />
     
          </Routes>
        </main>
      </BrowserRouter>

  )
}

export default App
