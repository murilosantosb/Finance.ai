import React from 'react'

// Components
import Icon from '../Icon'
import { BsFillEyeFill } from "react-icons/bs";

type FinancialInfoCardProps = {
    title: string;
    amount: number;
    icon: "wallet" | "piggy_bank" | "graph_up_arrow" | "graph_down_arrow" | "credit_card_fill" | "ticket" | "pix";
    variant: "primary" | "secondary" | "tertialy";
    background_icons: string;
    button?: React.ReactNode;
    iconOptional?: string;
}

const FinancialInfoCard: React.FC<FinancialInfoCardProps> = ({ title, amount, icon, button,variant, iconOptional, background_icons }) => {


  return (
    <section className={`financial-info-card ${variant === "primary" ? "card-info-primary" : variant === "secondary" ? "card-info-secondary" : "card-info-tertialy"}`}>
         <span className='span-icon'>
                <Icon variant={icon} background_color={background_icons}/>
                <p>{title}</p> 
         </span>

         <div>
            <strong className='d-flex align-items-center gap-2'>
                R$ {amount}
                {iconOptional && <BsFillEyeFill size={25}/>}
            </strong>

            {button}
         </div>
    </section>
  )
}  

export default FinancialInfoCard