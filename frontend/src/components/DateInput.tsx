'use client';

import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { FaRegCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { Form } from 'react-bootstrap';
import { UseFormRegister, FieldValues, Path, FieldError, UseFormSetValue, UseFormWatch } from "react-hook-form";

interface DateInputProps<T extends FieldValues> {
  name: Path<T>;
  error?: FieldError;
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
}

const DateInput = <T extends FieldValues>({ name, error, register, setValue, watch }: DateInputProps<T>) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    useEffect(() => {
      const formDate = watch(name);
      if (formDate) {
        setSelectedDate(new Date(formDate));
      }
    }, [name, watch]);

  return (
    <Form.Group className="date-input-form">
      <Form.Label>Data</Form.Label>
      <span>
        <FaRegCalendarAlt />
        <DatePicker 
          selected={selectedDate}
          onChange={(date: Date | null) => {
            setSelectedDate(date);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setValue(name, date ?? undefined as any, { shouldValidate: true }); 
          }}
          dateFormat="dd/MM/yyyy"
          className="custom-datepicker"
          placeholderText="Selecionar Dia"
          onKeyDown={(e) => e.preventDefault()}
        />

        <input type="hidden" {...register(name)} />
      </span>
      {error && <span className="text-danger">{error.message}</span>}
    </Form.Group>
  );
}

export default DateInput;
