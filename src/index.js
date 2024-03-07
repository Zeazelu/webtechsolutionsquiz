import React from 'react';
import ReactDOM from 'react-dom';
import './resources/styles.css';
import Header from './components/Header/Header.js';
import Main from './components/core/Main.jsx';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
