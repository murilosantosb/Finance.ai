import React from 'react'

// Componentes
import Icon from '../Icon';

// Utils
import { formatDate } from '@/utils/formatDate';
import realToCents from '@/utils/realToCents';

import { TransactionItemProps } from '@/interfaces/transactionType';

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
                    variant={payment_method === "PIX" ? "pix" : payment_method === "CARD" ? "credit_card_fill" : "ticket"}/>
                    
                    <span>
                        <strong>{title}</strong>
                        <time>{formatDate(date)}</time>
                    </span>

                </div>
                    <span className={financial_category === "GAIN" ? "color-green" : financial_category === "SPENT" ? "color-red" : "text-white"}>
                        {
                            financial_category === "GAIN" ? `+${realToCents({variant: "cents_to_real", money: amount})}` : `-${realToCents({variant: "cents_to_real", money: amount})}`
                        }
                    </span>
            </li>
        </ul>
    </>
  )
}

export default TransactionItem