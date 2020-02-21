import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Button from 'react-bootstrap/Button';
import { getFiles } from './files';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Button
          className="App-link"
          onClick={ () => getFiles()}
        >
          Learn React
        </Button>
        <img src={`data:image/jpeg;base64, $file.thumbnail`} />
      </header>
    </div>
  );
}

export default App;
