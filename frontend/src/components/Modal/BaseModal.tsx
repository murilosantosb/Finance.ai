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

  button_variant: string;
  button_title?: React.ReactNode;
  _id?: string;
}


const BaseModal: React.FC<BaseModalPropss> = (props) => {
  const [show, setShow] = useState(false);
  const [modalVariant, setModalVariant] = useState(props.variant);

  const handleClose = () => {
    setShow(false);
    setModalVariant(props.variant);
  };

  const handleShow = () => setShow(true);


  return (
    <>
      <Button className='modal-btn' variant={props.button_variant} onClick={handleShow}>
        {props.button_title}
      </Button>

      <Modal
       dialogClassName="modal-container"
       className='d-flex'
       centered show={show} onHide={handleClose}
       >
        <section>
            {modalVariant === "IA" ? (
              <ModalOpenIA handleClose={handleClose}/> 
            ) : modalVariant === "create_transition" ? (
              <AddTransactionModal handleClose={handleClose}/>
            ) : modalVariant === "modal_transition_delete" ? (
              <DeleteTransactionModal
               _id={props._id}
               variant='modal_delete'
               handleClose={handleClose}
               onDeleteSuccess={() => setModalVariant("modal_delete_confirm")}
               /> 
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
