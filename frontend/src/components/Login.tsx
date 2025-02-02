"use client";

import React from 'react';
//Next
import Image from 'next/image';
//Bootstrap
import { Button } from 'react-bootstrap';
//NextAuth
import { signIn } from "next-auth/react";
//Icon
import { FcGoogle } from "react-icons/fc";

const Login = () => {

  return (
      <section className='login'>
          <span className='brand'>
            <Image 
              src="/images/favicon.png"
              height={26}
              width={27}
              alt='Favicon'
            />
            <h1 className='h2'>finance.ai</h1>
          </span>

        
          <h1>Bem-vindo</h1>
          <p>A Finance AI é uma plataforma de gestão financeira
           que utiliza IA para monitorar suas movimentações, e
           oferecer insights personalizados, facilitando o controle
           do seu orçamento.</p>
          <Button
            variant='secondary'
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className='login-button'>
            <FcGoogle size={25}/>
            Entrar com Google
          </Button>

      </section>
  )
}

export default Login