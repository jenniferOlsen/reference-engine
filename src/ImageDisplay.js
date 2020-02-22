import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Button from 'react-bootstrap/Button';
import { getFiles } from './files';

const images = [
  '//placekitten.com/1500/500',
  '//placekitten.com/4000/3000',
  '//placekitten.com/800/1200',
  '//placekitten.com/1500/1500',
];

export default class ImageDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: false,
    };
  }

  getImages = () => {
    getFiles()
    this.setState({ isOpen: true })
}


  render() {
    const { photoIndex, isOpen } = this.state;

    return (
      <div>
        <Button
          className='start-button'
          size="lg" 
          block
          onClick={() => this.getImages()}
        >
          Start
        </Button>
         {/* <img src={`data:image/jpeg;base64, $getFiles.entries[0].thumbnail`} /> */}

        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
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
