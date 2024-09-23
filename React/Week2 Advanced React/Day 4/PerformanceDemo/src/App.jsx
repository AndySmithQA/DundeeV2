import { useState } from 'react'
import './App.css'

  const ChildComponent = ({source}) => {
    console.log('Child Component re-rendered from', source)
    return <div className='child'>Child from {source}</div>  
  }

  const MovingComponent = ({children}) => { 
    const [pos, setPos] = useState({x: 100, y: 100})
    return (
      <div
      className='moving-div'
      onMouseMove={(e) => setPos({x: e.clientX -10, y: e.clientY -10})}
      style={{left: pos.x, top: pos.y}}
      >
        {children}
      </div>
    )
  }
  
  const MovingComponentNonPerformance = () => {
    const [pos, setPos] = useState({x: 100, y: 400})

    return (
      <div
        className="moving-div"
        onMouseMove={(e) => setPos({ x: e.clientX -10 , y: e.clientY -10 })}
        style={{ left: pos.x, top: pos.y }}
      >
        <ChildComponent source="non-performance function" />
      </div>
    )
  }


  export default function App() {
  return (
    <div className="container">
      <div className="column">
        <MovingComponent>
          <ChildComponent source={"from Performance function"}/>
        </MovingComponent>
      </div>
      <div className="column">
        <MovingComponentNonPerformance />
    </div>
    </div>
  )
}


