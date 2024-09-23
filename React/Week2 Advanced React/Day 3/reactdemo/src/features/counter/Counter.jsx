import { useSelector, useDispatch } from 'react-redux'
import { 
    decrement, 
    increment, 
    reset,
    incrementByAmount
 } from './counterSlice.jsx'
import  {useState } from 'react'

const Counter = () => {
    const count = useSelector((state) => state.counter.count)
    const dispatch = useDispatch()

    const [incrementAmount, setIncrementAmount] = useState('0')
    
    const addValue = Number(incrementAmount) || 0; //avoids NaN

    const resetAll = () => {
        setIncrementAmount('0')
        dispatch(reset())
    }

  return (
    <section>
        <p>{count}</p>
        <div>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
        </div>
        <input 
            type="text"
            value={incrementAmount}
            onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button onClick={() => dispatch(incrementByAmount(addValue))}>Add Amount</button>
        <button onClick={resetAll}>Reset</button>
    </section>
  )
}

export default Counter