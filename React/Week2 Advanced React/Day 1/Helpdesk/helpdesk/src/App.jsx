import { 
  createBrowserRouter,
  Route, 
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'
import './index.css'

import RootLayout from './layouts/RootLayout'
import HelpLayout from './layouts/HelpLayout'
import TicketsLayout from './layouts/TicketsLayout'

import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/help/Contact'
import Kb from './pages/help/Kb'
import NotFound from './pages/NotFound'
import Tickets, { ticketsLoader } from './pages/tickets/Tickets'
import TicketDetails, { ticketDetailsLoader } from './pages/tickets/TicketDetails'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path='help' element={<HelpLayout />}>
        <Route path='kb'element={< Kb />}/>
        <Route path='Contact'element={<Contact />}/>
      </Route>

      <Route path='tickets' element={<TicketsLayout />} > 
      <Route 
        index 
        element={<Tickets />}
        loader={ticketsLoader} 
      />

      <Route  
        path=':id'
        element={<TicketDetails />}
        loader={ticketDetailsLoader}
      />

      </Route>

      <Route path='*' element={<NotFound/>}/>
    </Route>
  )

)

function App() {
  return (
  <RouterProvider router={router} />
  )
}

export default App
