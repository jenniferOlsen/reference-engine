import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Image from 'react-bootstrap/Image';
import * as Images from './images';
import ImageDisplay from './ImageDisplay';

function App() {
  return (
    <div className="app">
        <Image src={ Images.randomElement } alt='' className="quote" />
        <ImageDisplay />
    </div>
  );
}

export default App;
