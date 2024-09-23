import { BrowserRouter } from 'react-router-dom' 
import './App.css'
import { RenderRoutes, RenderMenu } from './structure/RenderNavigation'
import { RenderHeader } from './structure/Header'

function App() {
 

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <RenderHeader />
          <RenderMenu />
          <RenderRoutes />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
