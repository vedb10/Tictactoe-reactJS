import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import Tictacto from "./tictac/Tictacto";
import Board from './tictac/Board'

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Tictacto />} />
              <Route path="game-board" element={<Board />} />     
                       
            </Routes>
    

    </div>
  );
}

export default App;
