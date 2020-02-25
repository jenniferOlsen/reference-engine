import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Button from 'react-bootstrap/Button';
import { getFiles, files } from './files';
import { shuffle } from './utlis';

export default class ImageDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: false,
      images: files,
    };
  }

  shuffleFiles = () => {
    let images = []
    let length = files.length - 1;
    let index = [...Array(length).keys()]
    let keys = Object.keys(files);

    shuffle(index)
    keys.sort(function(a,b) {return Math.random() - 0.5;});
    keys.forEach(function(k) {images.push(files[k]);});
    this.setState({ images: images }) 
  }

  displayImages = () => {
    this.shuffleFiles()
    this.setState({ isOpen: true })
  }

  componentDidMount = () => {
    getFiles()
  }

  render() {
    const { photoIndex, isOpen, images } = this.state;
    const base64 = 'data:image/jpeg;base64,'
    return (
      <div>
        <Button
          className='start-button'
          size="lg" 
          block
          onClick={() => this.displayImages()}
        >
          Start
        </Button>
    
        {images.length > 0 && isOpen && (
          <Lightbox
            mainSrc={base64+images[photoIndex].thumbnail}
            nextSrc={base64+images[(photoIndex + 1) % images.length].thumbnail}
            prevSrc={base64+images[(photoIndex + images.length - 1) % images.length].thumbnail}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
          />
        )}
      </div>
    );
  }
}
