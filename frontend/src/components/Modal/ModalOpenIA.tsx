"use client";
import React from 'react';

import { FiFileText } from "react-icons/fi";
import { Button, Modal } from "react-bootstrap"

import { ModalProps } from '@/interfaces/modalType';

const ModalOpenIA: React.FC<ModalProps> = (props) => {
  return (
    <>
      <Modal.Header closeButton className='modal-header'>
              <FiFileText size={25} className='text-primary'/>
              <Modal.Title>Relatório IA</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-custom">
        <p>
          <strong className='text-primary'>Lorem ipsum </strong>
          dolor sit amet, consectetur adipiscing elit. Nullam
          convallis magna nec nisl commodo condimentum.
          Phasellus et elit id quam viverra laoreet.
          Cras elementum dapibus consectetur.
        </p>

        <p>
          Nullam non mauris <strong className='text-primary'>vitae lorem</strong> congue efficitur ac in neque.
          Nullam suscipit tempus rutrum. Donec luctus nulla eget nibh
          efficitur, id iaculis erat pharetra. 
        </p>

        <p>
          <strong className='text-danger'>Nullam magna</strong> felis, fringilla eu purus at,
          finibus pulvinar leo. Integer convallis consectetur
          odio, ut pellentesque elit varius a. Aliquam nec
          dolor eget turpis suscipit dignissim id id enim.
          Nam dictum pulvinar risus a ultricies. Aenean vel nisl neque
        </p>
      </Modal.Body>
      <Modal.Footer className='modal-footer'>
            <Button variant='secondary' onClick={props.handleClose}>
                Confirmar
            </Button>
      </Modal.Footer>
    </> 
  )
}

export default ModalOpenIA