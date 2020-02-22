import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Button, Image } from 'react-bootstrap';
import { getFiles } from './files';
import * as Images from './images';

function App() {
  return (
    <div className="app">
        <Image src={ Images.randomElement } alt='' className="quote" />
         <Button
          className='start-button'
          size="lg" 
          block
          onClick={ () => getFiles()}
        >
          Start
        </Button>
         {/* <img src={`data:image/jpeg;base64, $getFiles.entries[0].thumbnail`} /> */}
    </div>
  );
}

export default App;
