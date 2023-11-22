import React,{useState,useEffect} from 'react'
import { Link } from "react-router-dom";
import '../assets/tictac.css'
import "@fontsource/dm-sans"
import xLogo from '../assets/x.svg'
import oLogo from '../assets/o.svg'
import whitex from '../assets/white-x.svg'
import whiteo from '../assets/white-o.svg'
import darkx from '../assets/dark-x.svg'
import darko from '../assets/dark-o.svg'


export default function Tictacto() {
    const [isXSelected, setIsXSelected] = useState(true);
    localStorage.setItem('userpick','X')
  

  const handleSelectXClick = ()=>{
    setIsXSelected(true);
    localStorage.setItem('userpick', 'X')
    
    
  }

  const handleSelectOClick = ()=> {
    setIsXSelected(false);
    localStorage.setItem('userpick', 'O')
   
    
  }
  const [fade , setFade] = useState("none")
  const invite = () =>{
    setFade("flex")
    setTimeout(()=>{
    setFade("none")

    },1500)
  }

  const [items, setItem] = useState('');

  const advice = () => {
    fetch('https://api.adviceslip.com/advice')
      .then((response) => response.json())
      .then((result) => setItem(result.slip))
      .catch((error) => console.error('Error fetching data:', error));
  };
  useEffect(()=>{

    advice()
   const intervalID = setInterval(advice,60000);
    return () => clearInterval(intervalID);

  },[])
  
  return (
    <div>
      <div className='invitation' style={{display:`${fade}`}}> Invite link copied</div>
        <div className="quote">
        <h2>Quote #{items.id}</h2>
        <p>{items.advice}</p>
        </div>
        <div className="main-area">
            <div className="titlebar">
                <div className='titleimage'  >
                <img src={xLogo} alt='xlogo'/>
                <img src={oLogo} alt='ologo'/>
                </div>
                

            </div>
            <div className="startpage">
                <div className="pick-player">
                    <div className='pick-player-title'>PICK PLAYER</div>
                    <div className='player-selection'>
                    <button id='select-x' onClick={handleSelectXClick} style={{ backgroundColor: isXSelected ? 'white' : '#192A32' }}>
                        <img src={isXSelected ? darkx : whitex} alt='x' />
                    </button>
                    <button id='select-o' onClick={handleSelectOClick} style={{ backgroundColor: isXSelected ? '#192A32' : 'white' }}>
                        <img src={isXSelected ? whiteo  :  darko} alt='o' />
                    </button>
                    </div>
                </div>

            </div>

                <div className="new-game">
                <Link to="/game-board"> <button className='start-btn'>NEW GAME ( VS CPU )</button></Link>  
                    <button className='versus-btn'>NEW GAME ( VS HUMAN ) Coming soon</button>  
                </div>
                <div className="invite">
                    <button className='invite-btn' onClick={invite}>Invite your friend</button>
                </div>
                
                                        
                    
        </div>
    </div>
    
  )
  
}
