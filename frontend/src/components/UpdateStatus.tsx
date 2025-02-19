
import React from 'react'

// Hooks
import useStatusMessage from '@/hooks/useStatusMessage';

// icons
import { CgDanger } from "react-icons/cg";
import { FaCircleCheck } from "react-icons/fa6";



const UpdateStatus: React.FC = () => {
    const { statusMessage } = useStatusMessage();

  return (
    <section className={
        `update-status-container
        ${statusMessage === "alert" ? "update-status-alert" : "update-status-success"}
    `}>
        <span>
            {statusMessage === "alert" ? <CgDanger /> : <FaCircleCheck />}
            <strong>
                {statusMessage === "alert" ? "Atenção" : "Alterações feitas"}
            </strong>
        </span>
        <p>
            {
                statusMessage === "alert" ? "Salve as alterações antes de sair." :
                "As alterações foram salvas com sucesso!"
            }
        </p>
    </section>
  )
}

export default UpdateStatus