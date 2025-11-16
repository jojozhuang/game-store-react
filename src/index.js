import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';

const basename = process.env.REACT_APP_ENV_NAME === "GitHub Pages" ? "/game-store-react" : "/";

ReactDOM.render((
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>
), document.getElementById('root'));