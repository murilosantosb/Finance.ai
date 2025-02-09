"use client"

// Next
import Image from 'next/image';
//Hooks
import React, { useState } from 'react';
import { signOut } from "next-auth/react"

// Components
import { Button, Offcanvas } from "react-bootstrap"
import { CiLogout } from "react-icons/ci";
import { useSession } from 'next-auth/react';


const OffcanvasPanel: React.FC = () => {
    const [show, setShow] = useState(false);
    const { data } = useSession()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <>
        <Button variant='outline-dark' className='d-flex align-items-center gap-1 text-white fw-medium' onClick={handleShow}>
            <Image
                src={data?.user.image ? `${data?.user.image}` : "/images/photo-user.jpg"} 
                width={30}
                height={30}
                alt='Imagem da conta do usuário'
                className='rounded-5'
            />
            {data?.user.name}
        </Button>
        <Offcanvas className="bg-secondary" show={show} onHide={handleClose} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className='text-white'>Perfil do usuário</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='text-white d-flex flex-column align-items-center gap-4'>
                <Image
                    src={data?.user.image ? `${data?.user.image}` : "/images/photo-user.jpg"} 
                    width={120}
                    height={120}
                    alt='Imagem da conta do usuário'
                    className=' rounded-5'
                />
                <strong className='h2 font-monospace'>{data?.user.name}</strong>
                <p><strong>Email:</strong> {data?.user.email}</p>
            <Button
                variant='outline-danger'
                className='text-white fw-bold d-flex align-items-center gap-2'
                onClick={() => signOut()}
              >
                <CiLogout />
                Logout
            </Button>
            </Offcanvas.Body>
        </Offcanvas>
    </>
  )
}

export default OffcanvasPanel