"use client";

import React from 'react'
import { DropdownButton, Dropdown } from "react-bootstrap"
import { useState } from 'react';

const DropdownButtonComponent: React.FC = () => {
    const months = [
        {label: "Janeiro"},
        {label: "Fevereiro"},
        {label: "Março"},
        {label: "Abril"},
        {label: "Maio"},
        {label: "Junho"},
        {label: "Julho"},
        {label: "Agosto"},
        {label: "Setembro"},
        {label: "Outubro"},
        {label: "Novembro"},
        {label: "Dezembro"},
    ];

    const [selectedMonth, setSelectedMonth] = useState<string>("Selecionar por mês")

    const handleSelectedMonth = (month: string) => {
        setSelectedMonth(month)
    }

  return (
    <DropdownButton variant='outline-light' title={selectedMonth}>
        {months && months.map((month, index) => (
            <Dropdown.Item key={index} onClick={() => handleSelectedMonth(month.label)}>
                {month.label}
            </Dropdown.Item>
        ))
        }
    </DropdownButton>
  )
}

export default DropdownButtonComponent
