import React from 'react'

// Componentes
import Icon from '../Icon';

interface TransactionItemProps {
    title: string;
    payment_method: "PIX" | "CREDIT" | "BILLET";
    financial_category: "GAIN" | "SPENT" | "INVESTMENT";
    date: string | undefined;
    amount: number;
}

const TransactionItem: React.FC<TransactionItemProps> = ({title, payment_method, financial_category, date, amount}) => {
  return (
    <>
        <ul className='transaction-list'>
            <li>
                <div>
                    <Icon
                    background_color=
                    {
                        financial_category === "GAIN" ? "background-icon-secondary-revenue" :
                        financial_category === "SPENT" ? "background-icon-secondary-expenses" :
                        "background-icon-tertialy"
                    }
                    variant={payment_method === "PIX" ? "pix" : payment_method === "CREDIT" ? "credit_card_fill" : "ticket"}/>
                    
                    <span>
                        <strong>{title}</strong>
                        <time dateTime={date}>15 Nov, 2024</time>
                    </span>

                </div>
                    <span className={financial_category === "GAIN" ? "color-green" : financial_category === "SPENT" ? "color-red" : "text-white"}>
                        {
                            financial_category === "GAIN" ? `+R$ ${amount}` : `-R$ ${amount}`
                        }
                    </span>
            </li>
        </ul>
    </>
  )
}

export default TransactionItem