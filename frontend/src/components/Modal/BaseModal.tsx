"use client";
import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import ModalOpenIA from './ModalOpenIA';

interface BaseModalPropss {
  variant:
  "modal_transition_delete" |
  "modal_delete_confirm" |
  "create_transition" |
  "IA";

  button_title?: React.ReactNode;
  button_variant: string;
}


const BaseModal: React.FC<BaseModalPropss> = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className='modal-btn' variant={props.button_variant} onClick={handleShow}>
        {props.button_title}
      </Button>

      <Modal dialogClassName='modal-container' centered show={show} onHide={handleClose}>
        <section>
            <ModalOpenIA handleClose={handleClose}/>
        </section>
      </Modal>
    </>
  )
}

export default BaseModal


/*

<Modal.Header closeButton className='modal-header'>
              {props.modal_icon && props.modal_icon}
              <Modal.Title className='text-white'>{props.title_modal}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body-custom">{props.modal_content}</Modal.Body>
          <Modal.Footer className='modal-footer'>
            {props.modal_button_secondary?.title && (
              <Button variant={props.modal_button_secondary.variant} onClick={handleClose}>
                {props.modal_button_secondary.title}
              </Button>
            )}
            <Button variant={props.modal_button_primary.variant} onClick={handleClose}>
              {props.modal_button_primary.title}
            </Button>
          </Modal.Footer>

*/