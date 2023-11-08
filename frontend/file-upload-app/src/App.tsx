import React from 'react';
import logo from './logo.svg';
import './App.css';
import FileUpload from './fileUpload';
import FileDrop from './fileDrop';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>     
        <FileUpload />  
        </p>
        <p>     
        or 
        </p>
        <p>     
        <FileDrop />
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </header>
    </div>
  );
}

export default App;
