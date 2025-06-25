
import './App.css';
import React, { useEffect, useReducer, useRef, useState,useLayoutEffect, use, useCallback} from 'react';


import Die from './Die';

import Confetti from "react-confetti";

function Test() {

  const [favThing, setFavThing] = useState([]);
  const emojis = ["😊", "🔥", "🌟", "💡", "🎯", "🚀", "❤️", "🙌", "🐱", "📚"];
  const thingsElement = favThing.map(thing =>  <p key={thing}> {thing}</p>);

   console.log("FINAL--->",thingsElement.length);

  function addFavouriteTjong(){
    setFavThing(prev=> [...prev, emojis[prev.length] ])
  }
  return (
    <>
      <button onClick={addFavouriteTjong}>Add ITEM</button>
        <section>
          {thingsElement}
        </section>
    </>
  );
}

function Test1(){
  const [block, setBlock] = useState(pads);

  const toggleColor = (id)=> {
    console.log(id);
    const updatedBlock = block.map(block=> block.id === id ? {...block, on: !block.on} : block);

    setBlock(updatedBlock)
    console.log(updatedBlock);
  }
  const hideAll = ()=>{
    const hideAll = block.map(block => ({...block, on:false}))
    setBlock(hideAll)
  }


  const buttonElement = block.map(pad=> <div key={pad.id} onClick={()=>toggleColor(pad.id)} style={{width:"100px",height:"100px", margin: "10px",backgroundColor:pad.on?pad.color: "black",display:"inline-block", borderRadius: "8px", border:"4px solid black"}} >  </div>)
 
  return (
    <div>
      {buttonElement}
       <button onClick={hideAll} style={{ marginTop: "20px", padding: "10px" }}>HIDE</button>
    </div>
  )
}

function Meme(){
  const [meme, setMeme] = useState({
    topText:"one does not Simply",
    bottomText : "walk  into Mordor",
    imageUrl : "https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400_1280.png"
  });

  function handleChange(event){
    const {value,name} = event.currentTarget;
    console.log(value);
    setMeme(prevMeme=>  (
      {
        ...prevMeme,
        [name] : value
        }));
  }

    return(
      <main>
          <div className='form'>
              <label htmlFor="">{meme.topText}
              <input type="text" placeholder='enter' onChange={handleChange} name='topText' />
              </label>
              <br />
              <br />
              <br />
              <label htmlFor="">{meme.bottomText}
              <input type="text" placeholder='walk in to modor' name='bottomText' />
              
              </label>
              <button>Get a Meme Image</button>
          </div>
          <div  style={{textAlign:"center"}}>
            <br />
            <br />
            <img src="https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400_1280.png" width={200} alt="" />
            <br />
            <br />
            <span className='top'>One doen not simple</span>
            <span className='bottom'>Walk in to Moddor</span>
          </div>
      </main>
    )
}

function RandomUser(){
    const [user, setUser] = useState(null);

    useEffect(() => {
    fetch("https://randomuser.me/api")
      .then(res => res.json())
      .then(data => setUser(data.results[0]));
    }, []); 

 
    console.log("SUERRR-->",user);
    return(
      <div>
        <pre>{JSON.stringify(user , null, 4)}</pre>
      </div>
    );
}

function Main(){
  const [dice, setDice] = useState(()=>generateAllNewDice());
  const buttonRef = useRef(null);
  // console.log(buttonRef);

  const gameWon = dice.every(die=> die.isHeld) && dice.every(die=> die.value === dice[0].value)
    
  useEffect(()=>{
      if(gameWon){
        buttonRef.current.focus();
      }
  },[gameWon])

  function generateAllNewDice(){
  
    return new Array(10)
    .fill(0)
    .map(()=> ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false }))
  }

  // console.log(generateAllNewDice());

  function rollDice(){
    if(!gameWon){
      setDice(oldDice=> oldDice.map(die=> die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}));
    }
    else{
      setDice(generateAllNewDice())
    }
  }

  function hold(id){  
    // console.log(id);
      setDice(prev=> {
        return prev.map((die,index)=> {
           return id == index ?  {...die, isHeld: !die.isHeld} : die
        })
      });
  }

  const diceElement = dice.map((dieObj,index)=> <Die key={index} number={dieObj.value} isHeld={dieObj.isHeld} hold={() => hold(index)} />)

    return <main>
            <p>✅ Select Any Number And Roll it until you get the Same number on all dice.</p>
            {gameWon && <Confetti />}
            <div className='dice-container'>
              {diceElement}
            </div>
            <br />
            <button ref={buttonRef} className='roll-dice' onClick={rollDice}>{gameWon ? "New Game" : "Roll"}</button>
        </main>
}


function App() {
  return(
    <Main />
  )
}


export default App
