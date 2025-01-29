import React from 'react'
import FinancialInfoCard from './FinancialInfoCard'
import { Button } from 'react-bootstrap'

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
        icon='bi bi-wallet'
        iconOptional='bi bi-eye'
        background_icons='background-icon-primary'
        button=
        {
          <Button className='text-white d-flex align-items-center gap-2 h-75 rounded-5'>
            Adicionar Transação
            <i className="bi bi-arrow-down-up"></i>
          </Button>
        }
           />
      <FinancialInfoCard variant='secondary' title='Investido' amount={3500} icon='bi bi-piggy-bank' background_icons='background-icon-secondary'/>
      <FinancialInfoCard variant='tertialy' icon='bi bi-graph-up-arrow' title='Receita' amount={8150} background_icons='background-icon-revenue'/>
      <FinancialInfoCard variant='tertialy' icon='bi bi-graph-down-arrow' title='Despesas' amount={2950} background_icons='background-icon-expenses'/>
    </section>
  )
}

export default FinancialSummaryGroup;