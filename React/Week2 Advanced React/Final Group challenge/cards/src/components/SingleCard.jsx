import './SingleCard.css'

export default function SingleCard( {card, handlePick, flipped, delay} ) {

    const handleclick = () => {
        if (!delay) {
            handlePick(card)
        }
    }


  return (
    <div className="card">
        <div className={flipped ? "flipped" : ""}>
            <img className='front' src={card.src} alt="card front" />
            <img 
                className='back' 
                src="/img/cover.png" 
                onClick={handleclick} 
                alt="card back"
            />
        </div>
    </div>
  )
}

