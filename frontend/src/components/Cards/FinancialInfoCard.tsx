import React from 'react'

type FinancialInfoCardProps = {
    title: string;
    amount: number;
    icon: string;
    variant: "primary" | "secondary" | "tertialy";
    button?: React.ReactNode;
    iconOptional?: string;
    background_icons?: string;
}

const FinancialInfoCard: React.FC<FinancialInfoCardProps> = ({ title, amount, icon, button,variant, iconOptional, background_icons }) => {


  return (
    <section className={`financial-info-card ${variant === "primary" ? "card-info-primary" : variant === "secondary" ? "card-info-secondary" : "card-info-tertialy"}`}>
         <span className='span-icon'>
            <span className={background_icons}>
                <i className={icon}></i>
            </span>
                <p>{title}</p> 
         </span>

         <div>
            <strong>
                R$ {amount}
                <i className={`${iconOptional} `}></i>
            </strong>

            {button}
         </div>
    </section>
  )
}  

export default FinancialInfoCard