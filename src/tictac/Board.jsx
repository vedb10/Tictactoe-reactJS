import React,{useState,useEffect} from 'react'
import { Link } from "react-router-dom";
import '../assets/tictac.css'
import "@fontsource/dm-sans"
import xLogo from '../assets/x.svg'
import xr from '../assets/xr.svg'
import or from '../assets/or.svg'
import oLogo from '../assets/o.svg'
import reset from '../assets/restart.svg'



export default function Board() {
const [items, setItem] = useState("");
const [title, setTitle] = useState("")
const [winline, setWinline] = useState("")
const [winnershow,setWinnershow] = useState("none")
const [span,setSpan] = useState("block")
const [userScore, setUserScore] = useState(() => {
  let storedUserScore = localStorage.getItem("userscore");
  return storedUserScore ? parseInt(storedUserScore, 10) : 0;
});

const [tieScore, setTieScore] = useState(() => {
  let storedTieScore = localStorage.getItem("tiescore");
  return storedTieScore ? parseInt(storedTieScore, 10) : 0;
});

const [cpuScore, setCpuScore] = useState(() => {
  let storedCpuScore = localStorage.getItem("cpuscore");
  return storedCpuScore ? parseInt(storedCpuScore, 10) : 0;
});




let arr = [null,null,null,null,null,null,null,null,null];
const userlogo = localStorage.getItem("userpick")
const [currentTurn, setCurrentTurn] = useState(userlogo);

const turn = () => {
  return currentTurn;
};


const advice = () => {
    fetch('https://api.adviceslip.com/advice')
      .then((response) => response.json())
      .then((result) => setItem(result.slip))
      .catch((error) => console.error('Error fetching data:', error));
  };
  
  useEffect(()=>{
    
    advice()
    const intervalID = setInterval(advice,60000);
    
    const handleClick = (boxId) => {
      const box = document.querySelector(`#box${boxId}`);
      if (box) {
        box.innerHTML = `<img className='box-img' src="${userlogo === "X" ? xr :or}" alt="xlogo"/>`;
        arr[boxId] = userlogo
        setTimeout(compmove,1000)
        setCurrentTurn((prevTurn) => (prevTurn === "X" ? "O" : "X"));
        decider()
      }
    };

    for (let i = 0; i <= 8; i++) {
      const box = document.querySelector(`#box${i}`);
      if (box) {
        box.addEventListener('click', () => handleClick(i));
        
      }
    }
    return () => clearInterval(intervalID);
    
    
  },[])

  let comppick = userlogo === "X" ? "O" : "X";
  function compmove() {
    let compbox;
  
    // Check if the game is already won or tied
    if (checkWinner(arr, "X") || checkWinner(arr, "O") || arr.every(item => item !== null)) {
      decider()
      arr = [null,null,null,null,null,null,null,null,null];
      return console.log(arr);
    }
  
  
    // Check if the computer can win in the next move
    for (let i = 0; i < 9; i++) {
      if (arr[i] === null) {
        arr[i] = comppick;
        if (checkWinner(arr, comppick)) {
          const box = document.querySelector(`#box${i}`);
          box.innerHTML = `<img className='box-img' src="${comppick === "X" ? xr :or}"alt="xlogo"/>`;
          console.log(arr);
          decider()
          return 
        }
        arr[i] = null;
      }
    }
  
    // Check if the player can win in the next move and block them
    for (let i = 0; i < 9; i++) {
      if (arr[i] === null) {
        arr[i] = userlogo;
        if (checkWinner(arr, userlogo)) {
          arr[i] = comppick;
          const box = document.querySelector(`#box${i}`);
          box.innerHTML = `<img className='box-img' src="${comppick === "X" ? xr :or}"  alt="xlogo"/>`;
          console.log(arr)
          decider()
          return ;
          
        }
        decider()
        arr[i] = null;
      }
    }
  
    // If no immediate winning or blocking move, make a random move
    do {
      compbox = Math.floor(Math.random() * 9);
    } while (arr[compbox] !== null);
  
    arr[compbox] = comppick;
  
    const box = document.querySelector(`#box${compbox}`);
    box.innerHTML = `<img className='box-img' src="${comppick === "X" ? xr :or}"  alt="xlogo"/>`;
    
    console.log(arr);
    decider()
  }
  
  function checkWinner(board, player) {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
  
    return winConditions.some(condition => condition.every(index => board[index] === player));
  }

  function decider(){
    
    let winner = null;

    if (checkWinner(arr, userlogo)) {
      winner = userlogo === "x" ? "CPU" : "YOU";
      setWinline(winner === "X" ? or : xr)
      
    } else if (checkWinner(arr, comppick)) {
      winner = userlogo === "O" ? "YOU" : "CPU";
      setWinline(winner === "O" ? xr : or)
    }
  
    if (winner) {
      setTitle(`${winner} WON !`);
      winner === "YOU" ? setUserScore(userScore + 1) : setCpuScore(cpuScore + 1)
      setWinnershow("block");
      
    } else if (arr.every(item => item !== null)) {
      setTitle("ITS A TIE");
      setTieScore(tieScore + 1)
      setWinnershow("block");
      setSpan("none")
      
    }
}

function quit(){
  localStorage.clear()
}
function restart(){
  window.location.reload(true);
}
function boardreset(){
  window.location.reload(true);

}
  

    

    
  
  return (
    <div>
        <div className="quote">
        <h2>Quote #{items.id}</h2>
        <p>{items.advice}</p>
        </div>
        <div className="main-area">
          <div className="winnerpage" style={{display : winnershow}}>
          <div className='winnerbox'>
            <div className="first-line">{title}</div>
            <div className="second-line">
              
              <span style={{color : winline === "X" ? '#31C4BE' : '#F2B237', display: `${span}`}}><img src={winline} alt="winlogo"/> TAKES THE ROUND </span>
              
              </div>
            <div className="third-line">
            <Link to="/"><button className='quit'onClick={quit}>QUIT</button></Link>
              <button className='restart' onClick={restart}>NEXT ROUND</button>

            </div>
          </div>
          </div>
            <div className="titlebar1">
                <div className='titleimage'  >
                <img src={xLogo} alt='xlogo'/>
                <img src={oLogo} alt='ologo'/>
                </div>
                <div className='turn'>
                    <div className='symbol' style={{marginRight:"5px"}}>{turn()}</div>
                    <div className='turntext'>TURN</div>
                </div>

                <div className='restart-btn'>
                    <button onClick={boardreset}><img src={reset} alt='reset'/></button>
                </div>

            </div>
            <div className="board">
               <div className="box" id='box0'></div>
               <div className="box" id='box1'></div>
               <div className="box" id='box2'></div>
               <div className="box" id='box3'></div>
               <div className="box" id='box4'></div>
               <div className="box" id='box5'></div>
               <div className="box" id='box6'></div>
               <div className="box" id='box7'></div>
               <div className="box" id='box8'></div>

            </div>

            <div className="scores">
              <div className='user-score'> 
                <p className='score-text'  >{userlogo} (YOU)</p > 
                <p className='score-num'>{userScore}</p>
                </div>
                <div className='tie-score'> 
                <p className='score-text' >TIES</p > 
                <p className='score-num'>{tieScore}</p>
                </div>
                <div className='cpu-score'> 
                <p className='score-text' >{userlogo === "X" ? "O" :"X"} CPU</p > 
                <p className='score-num'>{cpuScore}</p>
                </div>  
            </div>    
                
                                        
                    
        </div>
    </div>
    
  )
  
}
