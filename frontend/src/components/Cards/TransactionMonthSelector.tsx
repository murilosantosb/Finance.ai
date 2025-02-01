"use client"

import React from 'react'
//Componentes
import { Button } from 'react-bootstrap';
import TransactionItem from './TransactionItem';
import Link from 'next/link';

interface TransactionMonthSelectorProps {
    title?: string;
}

const TransactionMonthSelector: React.FC<TransactionMonthSelectorProps> = () => {
  return (
    <section className='transaction-month-selelector-container'>
        <header className='transaction-month-header'>
          <h1 className='text-white'>Transações</h1>
            <Link href="/transaction" className='btn btn-secondary'>
              Ver mais
            </Link>
        </header>

        <section>
            <TransactionItem title='Salário' payment_method='PIX' financial_category='GAIN' date='15/11/2024' amount={3900}/>
            <TransactionItem title='Bitcoin' payment_method='CREDIT' financial_category='INVESTMENT' date='15/11/2024' amount={120}/>
            <TransactionItem title='Aluguel' payment_method='BILLET' financial_category='SPENT' date='15/11/2024' amount={800}/>
            <TransactionItem title='Salário' payment_method='PIX' financial_category='GAIN' date='15/11/2024' amount={3900}/>
            <TransactionItem title='Bitcoin' payment_method='CREDIT' financial_category='INVESTMENT' date='15/11/2024' amount={120}/>
            <TransactionItem title='Aluguel' payment_method='BILLET' financial_category='SPENT' date='15/11/2024' amount={800}/>
            <TransactionItem title='Salário' payment_method='PIX' financial_category='GAIN' date='15/11/2024' amount={3900}/>
            <TransactionItem title='Bitcoin' payment_method='CREDIT' financial_category='INVESTMENT' date='15/11/2024' amount={120}/>
            <TransactionItem title='Aluguel' payment_method='BILLET' financial_category='SPENT' date='15/11/2024' amount={800}/>
            <TransactionItem title='Salário' payment_method='PIX' financial_category='GAIN' date='15/11/2024' amount={3900}/>
            <TransactionItem title='Bitcoin' payment_method='CREDIT' financial_category='INVESTMENT' date='15/11/2024' amount={120}/>
        </section>

    </section>
  )
}

export default TransactionMonthSelector