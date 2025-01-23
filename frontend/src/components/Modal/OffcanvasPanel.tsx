"use client"

// Next
import Image from 'next/image';
//Hooks
import React, { useState } from 'react';
import userStore from '@/store/userStore';
import { signOut } from "next-auth/react"

// Components
import { Button, Offcanvas } from "react-bootstrap"

interface OffcanvasPanelProps {
    user?: string;
}

const OffcanvasPanel: React.FC<OffcanvasPanelProps> = () => {
    const [show, setShow] = useState(false);
    const user = userStore((state) => state.user)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <>
        <Button variant='outline-dark' className='d-flex align-items-center gap-1 text-white fw-medium' onClick={handleShow}>
            <Image
                src={`${user.image}` || "/images/photo-user.jpg"} 
                width={30}
                height={30}
                alt='Imagem da conta do usuário'
                className=' rounded-5'
            />
            {user.name}
        </Button>
        <Offcanvas className="bg-secondary" show={show} onHide={handleClose} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className='text-white'>Perfil do usuário</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='text-white d-flex flex-column align-items-center gap-4'>
                <Image
                    src={`${user.image}` || "/images/photo-user.jpg"} 
                    width={120}
                    height={120}
                    alt='Imagem da conta do usuário'
                    className=' rounded-5'
                />
                <strong className='h2 font-monospace'>{user.name}</strong>
                <p><strong>Email:</strong> {user.email}</p>
            <Button
                variant='outline-danger'
                className='text-white fw-bold d-flex align-items-center gap-2'
                onClick={() => signOut()}
              >
                <i className="bi bi-box-arrow-left"></i>
                Logout
            </Button>
            </Offcanvas.Body>
        </Offcanvas>
    </>
  )
}

export default OffcanvasPanel