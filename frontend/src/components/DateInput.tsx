'use client';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { FaRegCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { Form } from 'react-bootstrap';


const DateInput = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <Form.Group className="date-input-form">
        <Form.Label>Data</Form.Label>
        <span>
            <FaRegCalendarAlt />
            <DatePicker 
                selected={selectedDate}
                onChange={(date: Date | null) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                className='custom-datepicker'
                placeholderText="Selecionar Dia"
            />
        </span>
    </Form.Group>
  )
}

export default DateInput