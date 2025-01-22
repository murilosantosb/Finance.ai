
import React from 'react'
import Image from 'next/image'

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
          <button className='btn btn-dark p-2 d-flex justify-content-center gap-3'>
            <i className="bi bi-google"></i>
            Entrar com Google
          </button>

      </section>
  )
}

export default Login