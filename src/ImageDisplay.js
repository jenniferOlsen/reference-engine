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
    };
  }

  displayImages = () => {
    this.setState({ isOpen: true })
}

  componentDidMount = () => {
    getFiles()
  }

  render() {
    const { photoIndex, isOpen } = this.state;
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
    
        {files.length > 0 && isOpen && (
          <Lightbox
            mainSrc={base64+files[photoIndex].thumbnail}
            nextSrc={base64+files[(photoIndex + 1) % files.length].thumbnail}
            prevSrc={base64+files[(photoIndex + files.length - 1) % files.length].thumbnail}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + files.length - 1) % files.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % files.length,
              })
            }
          />
        )}
      </div>
    );
  }
}
