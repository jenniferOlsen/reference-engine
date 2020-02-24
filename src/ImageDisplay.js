import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Button from 'react-bootstrap/Button';
import { getFiles, files } from './files';

export default class ImageDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: false,
      images: files,
    };
  }

  /**
   * Randomly shuffle an array
   * https://stackoverflow.com/a/2450976/1293256
   * @param  {Array} array The array to shuffle
   * @return {String}      The first item in the shuffled array
   */

    shuffle = (array) => {
      let currentIndex = array.length;
      let temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

	return array;

};

  shuffleFiles = () => {
    let images = []
    let length = files.length - 1;
    let index = [...Array(length).keys()]
    let keys = Object.keys(files);

    this.shuffle(index)
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
    console.log(images)
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
