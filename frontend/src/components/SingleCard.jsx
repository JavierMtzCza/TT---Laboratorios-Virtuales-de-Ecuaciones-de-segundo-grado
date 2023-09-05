import './cards.css'

export default function SingleCard( { card, handleChoice,flipped, disabled }) {

    const handleClick = () => {
        if(!disabled){
            handleChoice(card)
        }   
    }

    return (
        <div className="card" >
          <div className={flipped ? "flipped" : ""}>
            <img src={card.src} alt="card front" className="front" />
            <img 
            src="/memorama/signo.png" 
            alt="card back" 
            className="back"
            onClick={handleClick} />
          </div>
      </div>
    )
}
