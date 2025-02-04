"use client";

import React from 'react'
//Componentes
import FinancialInfoCard from './FinancialInfoCard'
import { LuArrowUpDown } from "react-icons/lu";
import BaseModal from '../Modal/BaseModal';

// Hooks
// import { use } from 'react';
import financeStore from '@/store/financeStore';
// import { useFetch } from '@/hooks/useFetch';

//Types
// import { userProps } from '@/interfaces/userType';

//Libs
import realToCents from '@/utils/realToCents';

const FinancialSummaryGroup: React.FC = () => {
  

  const { userFinance } = financeStore((state) => state);
  
  

  return (
    <section className='financial-container'>
      <FinancialInfoCard
        variant='primary'
        title='Saldo'
        amount={realToCents({variant: "cents_to_real", money: userFinance?.balance ?? 0})}
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
      <FinancialInfoCard
        variant='secondary'
        title='Investido'
        amount={realToCents({variant:"cents_to_real", money: userFinance?.investment ?? 0})}
        icon='piggy_bank'
        background_icons='background-icon-secondary'
      />
      <FinancialInfoCard
        variant='tertialy'
        icon='graph_up_arrow'
        title='Receita'
        amount={realToCents({variant:"cents_to_real", money: userFinance?.revenue ?? 0})}
        background_icons='background-icon-primary-revenue'
      />
      <FinancialInfoCard
        variant='tertialy'
        icon='graph_down_arrow'
        title='Despesas'
        amount={realToCents({variant:"cents_to_real", money: userFinance?.expenses ?? 0})}
        background_icons='background-icon-primary-expenses'
      />
    </section>
  )
}

export default FinancialSummaryGroup;

