import React, { useEffect, useState } from 'react';
import './App.scss';
import Form from 'react-bootstrap/Form';
import * as Quote from './quotes';
import GetImages from './GetImages';
import HelpModal from './HelpModal';
import { getCategories, categories } from './files';
import GoogleFontLoader from 'react-google-font-loader';

function App() {
  const [user] = useState(0) // only run useEffect once
  const [options, setCategories] = useState([categories])
  const [checked, setChecked] = useState([])

  const handleChange = (event) => {
    let option = event.target.id

    if (event.target.checked) {
      setChecked(checked.concat(option))
    } else {
      setChecked(checked.filter(item => item !== option))    
    }
  }
 
  useEffect( () => {
      getCategories().then(()=> {
        setCategories(categories)
      })
  }, [user])
  
  return (
    <div className="app">
      <GoogleFontLoader 
        fonts={[
            {
              font: 'Merienda',
              weights: [400, 700],
            },
          ]}
      />

      <HelpModal />
      <h1 className="quote">{ Quote.randomElement }</h1>
      
      { 
        options.length > 1 ? 
        (
          <Form className='category-form'>
            {options.map(option => (
              <div key={option.name} className="mb-3">
                <Form.Check 
                  type='checkbox'
                  id={option.name}
                  label={option.name}
                  custom={true}
                  onChange={(event) => {handleChange(event)}}
                />
              </div>
            ))}
          </Form>
        ) : null       
      }
      <GetImages options={checked} />
    </div>
  );
}

export default App;
