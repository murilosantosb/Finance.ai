"use client";

import React from 'react'

// Icons
import { MdDone } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

// Components
import { Button } from "react-bootstrap";

interface SubscriptionCardProps {
    variant: "BASIC" | "PRO";
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ variant }) => {
  return (
    <section className='subscription-card-container'>
         
        <div className='subscription-header'>
            <span>
                <span className='subscription-header-plan'>
                    {variant === "BASIC" && <span className='subscription-badge'>Atual</span>}
                    <p className='subscription-plan'>{variant === 'BASIC' ? "Plano Básico" : "Plano Pro"}</p>
                </span>
                <span className='subscription-header-price'>
                    <strong>R$ {variant === "BASIC" ? "0" : "19"} </strong>
                    <p>/mês</p>
                </span>
            </span>
        </div>
        <section className='subscription-content'>
            <span>
                <MdDone className='text-primary'/>
                <p>{variant === "BASIC" ? "Apenas 10 transações por dia 7/10" : "Transações ilimitadas"}</p>
            </span>
            <span>
                {variant === "BASIC" ? <IoMdClose className='text-white'/> : <MdDone className='text-primary'/>}
                <p>{variant === "BASIC" ? "Relatórios de IA ilimitados" : "Relatórios de IA ilimitados"}</p>
            </span>
            <span>
                {variant === "BASIC" ? 
                <>
                    <IoMdClose className='text-white'/> ...
                </>
                :
                <>
                    <MdDone className='text-primary'/> ...
                </>
                }
            </span>
            
        {variant === "BASIC" ? (
            <Button variant='outline-primary'>Fazer Upgrade</Button>
        ) : (
            <Button variant='primary' className='text-white'>Adquirir plano</Button>
        )}
        </section>
    </section>
  )
}

export default SubscriptionCard