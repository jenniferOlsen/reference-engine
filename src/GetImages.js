import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import { getFiles, files } from './files';
import { shuffle } from './utlis';
import DisplayImages from './DisplayImages';

function GetImages({options}) {

  const [images, setImages] = useState([])
  const [showImages, setShowImages] = useState(false)
  const [noImagesMsg, showNoImagesMsg] = useState(false)

  const shuffleFiles = () => {
    if (files.length > 0) {
      let images = []
      let index = [...Array(files.length).keys()]
      let keys = Object.keys(files);

      shuffle(index)
      keys.sort(function() {return Math.random() - 0.5;});
      keys.forEach(function(k) {images.push(files[k]);});

      setImages(images) 
      setShowImages(true)
    } else {
      showNoImagesMsg(true)
    }  
  }

  const displayImages = () => {
    getFiles(options).then( () => {
      // wait for files to return
      if (files.length > 0) {
        shuffleFiles() 
      } else {
        setTimeout( () => {
          shuffleFiles()
        }, 3000)
      }
    })   
  }

  const onClose = () => {
    // just clear everything
    window.location.reload()
  }
 
  return (
   <>
    {noImagesMsg && (
      <div>No Images Available</div>
    )}
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
