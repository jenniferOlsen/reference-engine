import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {authlink} from './auth';

function HelpModal({showModal}) {
  const [show, setShow] = useState(showModal);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return( 
    <>
      <div className='help-link'>
          <Button 
            size='lg' 
            variant='link'
            onClick={handleShow}
          >Help</Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='mx-auto'>How to use Reference Engine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ol>
            <li>Connect your <a href={authlink}>DropBox account</a></li>
            <li>Within Dropbox, find the automatically created folder at <code>Apps/Reference Engine</code></li>
            <li>Add reference images to Reference Engine. Tip: images can be organized in folders/categories (i.e. <code>Apps/Reference Engine/people</code>). This will allow you to choose specific categories of images you want to practice.</li>
            <li>Press the <code>Start</code> button and get to work!</li>
          </ol>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default HelpModal
