import React from 'react'
import FinancialInfoCard from './FinancialInfoCard'
import { Button } from 'react-bootstrap'
import { LuArrowUpDown } from "react-icons/lu";
import BaseModal from '../Modal/BaseModal';

type FinancialSummaryGroupProps = {
    title?: string
}

const FinancialSummaryGroup: React.FC<FinancialSummaryGroupProps> = () => {
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