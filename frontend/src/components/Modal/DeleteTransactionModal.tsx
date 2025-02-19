"use client";

import React from 'react';

import { ModalProps } from '@/interfaces/modalType';
import { Modal, Button } from 'react-bootstrap';
import { IoCloseCircleOutline } from "react-icons/io5";

interface DeleteModalProps extends ModalProps {
  variant: "modal_delete" | "modal_alert";
}

const DeleteTransactionModal: React.FC<DeleteModalProps> = (props) => {
  return (
    <>
    <Modal.Header className='modal-header'>
            {props.variant === "modal_delete" ? (
              <>
                <IoCloseCircleOutline size={25} className='bg-danger text-black rounded-5'/>
                <Modal.Title>Deseja deletar essa transação?</Modal.Title>
              </>
            ) : (
              <Modal.Title>Transação deletada!</Modal.Title>
            )}
    </Modal.Header>
    <Modal.Body className="modal-body-custom">
      {props.variant === "modal_delete" ? (
        <p>Uma vez deletada não poderá recuperá-la.</p>
      ) : (
        <p>A transação foi deletada do sistema.</p>
      )}
    </Modal.Body>
    <Modal.Footer className='modal-footer'>
          {props.variant === "modal_delete" ? (
            <>
              <Button variant='secondary' onClick={props.handleClose}>
                  Cancelar
              </Button>
              <Button className='btn btn-danger text-white' onClick={props.handleClose}>
                  Deletar
              </Button>
            </>
          ) : (
            <Button variant='secondary' onClick={props.handleClose}>
              Confirmar
            </Button>
          )}
    </Modal.Footer>
  </> 
  )
}

export default DeleteTransactionModal