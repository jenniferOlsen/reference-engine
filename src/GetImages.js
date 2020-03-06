import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { getFiles, files } from './files';
import { startButtonText, authlink } from './auth';
import { shuffle } from './utlis';
import DisplayImages from './DisplayImages';

function GetImages({options}) {

  const [images, setImages] = useState([])
  const [showImages, setShowImages] = useState(false)
  const [noImagesMsg, showNoImagesMsg] = useState(false)
  const [loading, setLoading] = useState(false)
  const [connected, getConnection] = useState()

  useEffect( () => {
     if (startButtonText === 'Connect to Dropbox') {
      getConnection(false)
    } else {
      getConnection(true)
    }
  }, [connected])

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
      setLoading(false)
    } else {
      showNoImagesMsg(true)
      setLoading(false)
    }  
  }

  const displayImages = () => {
    setLoading(true)
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

  const redirectToAuth = () => {
    window.location = authlink
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
        onClick={connected ? () => displayImages() : () => redirectToAuth()}
      >
        {startButtonText}
        {loading && (
          <Spinner
            as="span"
            animation="grow"
            variant="light"
            role="status"
            size="sm"
            aria-hidden="true"
            className='ml-2 align-middle'
          />
        )}
    </Button>
    {images && images.length > 0 && showImages && (
      <DisplayImages images={images} onClose={() => onClose()} />
    )}

  </>
  )
}

export default GetImages
