import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

function ImageDisplay({images, onClose}) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const base64 = 'data:image/jpeg;base64,'

  return (
    <Lightbox
      mainSrc={base64+images[photoIndex].thumbnail}
      nextSrc={base64+images[(photoIndex + 1) % images.length].thumbnail}
      prevSrc={base64+images[(photoIndex + images.length - 1) % images.length].thumbnail}
      onCloseRequest={() => onClose()}
      onMovePrevRequest={() =>
        setPhotoIndex(
          (photoIndex + images.length - 1) % images.length,
        )
      }
      onMoveNextRequest={() =>
        setPhotoIndex(
          (photoIndex + 1) % images.length,
        )
      }
    />
  )
}

export default ImageDisplay
