import React, { useEffect, useState } from 'react';
import './App.scss';
import Form from 'react-bootstrap/Form';
import * as Quote from './quotes';
import GetImages from './GetImages';
import { getCategories, categories } from './files';
import GoogleFontLoader from 'react-google-font-loader';

function App() {
  // only run useEffect once
  const [user] = useState(0) 
  const [options, setCategories] = useState([categories])
  const [selectedOptions, selectOptions] = useState([])

  const handleCheck = (option) => {
    selectOptions(selectedOptions.concat(option))
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
      <h1 className="quote">{ Quote.randomElement }</h1>
      {console.log(selectedOptions)}
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
                  onChange={()=> {handleCheck(option.name)}}
                />
              </div>
            ))}
          </Form>
        ) :
        <div>No categories available</div>
      }
      <GetImages categories={selectedOptions} />
    </div>
  );
}

export default App;
