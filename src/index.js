// import React from 'react';
// import ReactDOM from 'react-dom/client';

// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

 
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Import the BrowserRouter

import App from './App'; // Your main App component

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
