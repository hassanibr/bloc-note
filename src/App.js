import React from 'react';
import Game from './component/Game';
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'
import './App.css';
import Button from './component/Button'


export default function App() {
  // the control remote to array an in rolling it
  const [dice, setDice]= React.useState(generate())
  const [tenzies, setTenzies]=React.useState(false)

  // we are going to check if all dice are held
  React.useEffect(() => {
    const allHeld = dice.every(die => die.isheld);
    const firstValue = dice[1].num;
    const allSameValue = dice.every(die => die.num === firstValue)
      if (allHeld && allSameValue) {
            setTenzies(true)
            console.log("You won!")
        }
        console.log(allSameValue)
    }, [dice])
  //generate new dice
  function generateNewDice(){
    return{
        id: nanoid(),
        num: Math.ceil(Math.random()*7),
        isheld: false
        
      }
  }

  // code below generate un array of numbers
  function generate(){
    const array = []
    for (let i=0; i<10; i++) {
      array.push(generateNewDice())
    }
    return array
  }


  // this functon roll upon click
  function roll(){
    if(tenzies){

      setTenzies(false)
      setDice(generate())

    }else{
    setDice(oldDice=> oldDice.map(die=>{
      return die.isheld? die : generateNewDice()
    }))
  }
  }


  // this function check holds and changes isheld status
  function hold(id) {
    setDice(oldDice => oldDice.map(die => {
        return die.id === id ? 
            {...die, isheld: !die.isheld} :
            die
    }))
}
 

  // this where the array is stored
  const diceElements = dice.map(die =>(
          <Game 
              key = {die.id} 
              value= {die.num} 
              isheld={die.isheld} 
              hold={() => hold(die.id)}
          />))

  
  return (
    
    <main>
      {tenzies && <Confetti />}
      <div className='die-container'>
        {diceElements}
      </div>
      <Button ResetButton = {roll} text={tenzies? 'New Game': 'Roll'}/>
    </main>
  );
}

