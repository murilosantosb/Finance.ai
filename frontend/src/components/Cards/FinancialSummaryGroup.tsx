"use client";

import React from 'react'
//Componentes
import FinancialInfoCard from './FinancialInfoCard'
import { LuArrowUpDown } from "react-icons/lu";
import BaseModal from '../Modal/BaseModal';

// Hooks
import { useState, useEffect } from 'react';
import userStore from '@/store/userStore';
// API
import apiRequest from '@/utils/apiRequest';
//Types
import { userProps } from '@/interfaces/userType';

type FinancialSummaryGroupProps = {
    title?: string
}

const FinancialSummaryGroup: React.FC<FinancialSummaryGroupProps> = () => {
  const [userData, setUserData] = useState<userProps>()

  const id = userStore((state) => state.user.id)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
       const data = await apiRequest({
          endpoint: `/users/${id}`,
          method: "GET"
        })
        
        if(!data){
          throw new Error("Usuário não encontrado!")
        }
  
        return setUserData(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUserData() 
  }, [userData, setUserData, id])


  return (
    <section className='financial-container'>
      <FinancialInfoCard
        variant='primary'
        title='Saldo'
        amount={2700}
        icon='wallet'
        iconOptional='eye'
        background_icons='background-icon-primary'
        button=
        {
          <BaseModal 
            variant='create_transition'
            button_variant='primary'
            button_title={
              <span className='text-white d-flex align-items-center gap-2'>
                Adicionar Transação
                <LuArrowUpDown />
              </span>
            }
          />
        }
           />
      <FinancialInfoCard variant='secondary' title='Investido' amount={3500} icon='piggy_bank' background_icons='background-icon-secondary'/>
      <FinancialInfoCard variant='tertialy' icon='graph_up_arrow' title='Receita' amount={8150} background_icons='background-icon-primary-revenue'/>
      <FinancialInfoCard variant='tertialy' icon='graph_down_arrow' title='Despesas' amount={2950} background_icons='background-icon-primary-expenses'/>
    </section>
  )
}

export default FinancialSummaryGroup;

/*
<Button className=''>
            
          </Button>
*/