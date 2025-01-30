import React from 'react'

//Componentes
import { ProgressBar } from "react-bootstrap"

interface ExpenseCategoryProgressProps {
    title?: string;
}

const ExpenseCategoryProgress: React.FC<ExpenseCategoryProgressProps> = () => {
  return (
    <section className='expense-category-container'>
        <h1>Gastos por categoria</h1>

        <section className='expense-category-content'>
             
            <div>
                <span>
                    <p>Moradia</p>
                    <p>50%</p>
                </span>
                <ProgressBar variant='info' now={50}/>
                <p className='text-info fw-bolder mt-1'>R$ 2.500</p>
            </div>

            <div>
                <span>
                    <p>Alimentação</p>
                    <p>40%</p>
                </span>
                <ProgressBar variant='info' now={40}/>
                <p className='text-info fw-bolder mt-1'>R$ 1.200</p>
            </div>

            <div>
                <span>
                    <p>Saúde</p>
                    <p>30%</p>
                </span>
                <ProgressBar variant='info' now={30}/>
                <p className='text-info fw-bolder mt-1'>R$ 320,00</p>
            </div>

            <div>
                <span>
                    <p>Transporte</p>
                    <p>20%</p>
                </span>
                <ProgressBar variant='info' now={20}/>
                <p className='text-info fw-bolder mt-1'>R$ 150,00</p>
            </div>

        </section>
    </section>
  )
}

export default ExpenseCategoryProgress