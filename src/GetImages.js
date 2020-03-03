import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import { getFiles, files } from './files';
import { shuffle } from './utlis';
import DisplayImages from './DisplayImages';

function GetImages({options}) {

  const [images, setImages] = useState([])
  const [showImages, setShowImages] = useState(false)

  const shuffleFiles = () => {
    let images = []
    let index = [...Array(files.length).keys()]
    let keys = Object.keys(files);

    shuffle(index)
    keys.sort(function() {return Math.random() - 0.5;});
    keys.forEach(function(k) {images.push(files[k]);});

    setImages(images) 
    setShowImages(true)
  }

  const displayImages = () => {
    getFiles(options).then( () => {

      // wait for files to return
      if (files.length > 0) {
        shuffleFiles() 
      } else {
        setTimeout( () => {
          shuffleFiles()
        }, 2000)
      }
    })   
  }

  const onClose = () => {
    // just clear everything
    window.location.reload()
  }
 
  return (
    <>
    <Button
        className='start-button'
        size="lg" 
        block
        onClick={() => displayImages()}
      >
        Start
    </Button>
    {images && images.length > 0 && showImages && (
      <DisplayImages images={images} onClose={() => onClose()} />
    )}
</>
  )
}

export default GetImages
