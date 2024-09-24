import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  {"src": "/img/horse-1.png", matched: false},
  {"src": "/img/bank-1.png", matched: false},
  {"src": "/img/pound-1.png", matched: false},
  {"src": "/img/piggy-1.png", matched: false},
  {"src": "/img/bag-1.png", matched: false},
  {"src": "/img/money-1.png", matched: false}
]

function App() {
  const [cards, setCards] = useState([])
  const [pickOne, setPickOne] = useState(null)
  const [pickTwo, setPickTwo] = useState(null)
  const [delay, setDelay] = useState(false)
  const [guesses, setGuesses] = useState(0)

  const rearrange = () => {
    const newOrder = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()}))
    console.log(newOrder);
    
    setPickOne(null)
    setPickTwo(null)
    setCards(newOrder)
    setGuesses(0)
  }

  const handlePick = (card) => {
   pickOne ? setPickTwo(card) : setPickOne(card) 
  }

  useEffect(() => {
    
    if (pickOne && pickTwo){
      setDelay(true)
      if (pickOne.src === pickTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === pickOne.src){
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        console.log(cards)
        reset()
      } else {
        setTimeout(() => {
           reset()
        }, 1000)
       
      }
    }
  },[pickOne, pickTwo])
  
  const reset = () => {
    setPickOne(null)
    setPickTwo(null)
    setGuesses(prevGuesses => prevGuesses + 1)
    setDelay(false)
  }

  useEffect(() => {
    rearrange()
  }, [])
  
  return (
    <div className="App">
      <h1>Lloyds Memory Game</h1>
      <button onClick={rearrange}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard  
            key={card.id} 
            card={card} 
            handlePick={handlePick}
            flipped={card === pickOne || card === pickTwo || card.matched}
            delay={delay}
            />
        ))}
      </div>
        <p>Guesses: {guesses}</p>
    </div>
     
  )
}

export default App
