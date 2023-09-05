
import { useEffect, useState } from 'react'
import '../components/cards.css'
import './memorama.css'
import SingleCard from '../components/SingleCard'


const cardImages = [
  {"src": "/memorama/uno.png", matched: false},
  {"src": "/memorama/dos.png", matched: false},
  {"src": "/memorama/tres.png", matched: false},
  {"src": "/memorama/cinco.png", matched: false},

]
function PA6JuegoMemo() {
  const[cards, setCards] = useState([])
  const[turns, setTurns] = useState(0)
  const[choiceOne, setChoiceOne] = useState(null)
  const[choiceTwo, setChoiceTwo] = useState(null)
  const[disabled, setDisabled] = useState(false)
  //cartas
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random() }))


    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  //escoger carta
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //Comparar 2 cartas seleecionadas
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards =>{
          return prevCards.map(card => {
            if (card.src === choiceOne.src){
              return{...card, matched: true}
            }else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  //reset choices & incrementar turno
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  //empezar un nuevojuego automaticamente
  useEffect(() =>{
    shuffleCards()
  }, [])

  //console.log(cards, turns)
  return (
    
    <div className="App">
        <h2>Magic Match</h2>
        <button onClick={shuffleCards}>Nuevo Juego</button>

        <div className="card-grid">
          {cards.map(card => (
            <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}/>
          ))}
        </div>
        <p>Turnos: {turns}</p>
    </div>
  );
}

export default PA6JuegoMemo