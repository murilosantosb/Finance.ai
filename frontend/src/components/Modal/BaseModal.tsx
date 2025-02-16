"use client";

import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import ModalOpenIA from './ModalOpenIA';
import DeleteTransactionModal from './DeleteTransactionModal';
import AddTransactionModal from './AddTransactionModal';

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
            {props.variant === "IA" ? (
              <ModalOpenIA handleClose={handleClose}/> 
            ) : props.variant === "create_transition" ? (
              <AddTransactionModal handleClose={handleClose}/>
            ) : props.variant === "modal_transition_delete" ? (
              <DeleteTransactionModal variant='modal_delete' handleClose={handleClose}/> 
            ) : (
              <DeleteTransactionModal variant='modal_alert' handleClose={handleClose}/>
            )
            }
        </section>
      </Modal>
    </>
  )
}

export default BaseModal
