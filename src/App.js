import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Image from 'react-bootstrap/Image';
import * as Images from './images';
import ImageDisplay from './ImageDisplay';
import { getCategories, categories } from './files';

function App() {

  const [options, setCategories] = useState([categories])
  // only run useEffect once
  const [user] = useState(0) 

  useEffect( () => {
      getCategories().then(()=> {
        setCategories(categories)
      })
  }, [user])
  
  console.log(options[0].name)
  return (
    <div className="app">
        <Image src={ Images.randomElement } alt='' className="quote" />
        { 
          options.length > 1 ? 
          <div>categories</div> :
          <div>no categories </div>
        }
        <ImageDisplay />
    </div>
  );
}

export default App;
