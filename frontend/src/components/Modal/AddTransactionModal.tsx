"use client";
import React from 'react';

// Types
import { ModalProps } from '@/interfaces/modalType';

// Componentes
import { Modal, Form, Button } from "react-bootstrap";
import DateInput from '../DateInput';
import { useTransactionForm } from '@/hooks/useTransactionForm';

const AddTransactionModal: React.FC<ModalProps> = (props) => {
    const { register, handleSubmit, errors, setValue, onSubmit, watch } = useTransactionForm(props.handleClose);

    return (
       <>
            <Modal.Header className="modal-header-add-transaction">
                <Modal.Title>Adicionar Transação</Modal.Title>
                <p>Insira as informações abaixo</p>
            </Modal.Header>
            <Modal.Body className="modal-body-add-transaction">
                <Form onSubmit={handleSubmit(onSubmit)} className="modal-form">
                    <Form.Group>
                        <Form.Label>Título</Form.Label>
                        <Form.Control aria-invalid={!!errors.title} {...register("title")} type="text" placeholder="Título" />
                        {errors.title && <span className="text-danger">{errors.title.message}</span>}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Valor</Form.Label>
                        <Form.Control aria-invalid={!!errors.amount} {...register("amount")} type="number" placeholder="R$ 0.000,00" />
                        {errors.amount && <span className="text-danger">{errors.amount.message}</span>}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Tipo da transação</Form.Label>
                        <Form.Select aria-invalid={!!errors.financial_category} {...register("financial_category")}>
                            <option value="">Selecione</option>
                            <option value="GAIN">Ganho</option>
                            <option value="SPENT">Gasto</option>
                            <option value="INVESTMENT">Investimento</option>
                            <option value="DEPOSIT">Depósito</option>
                            <option value="SAKE">Saque</option>
                        </Form.Select>
                        {errors.financial_category && <span className="text-danger">Escolha uma opção.</span>}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Método de pagamento</Form.Label>
                        <Form.Select aria-invalid={!!errors.payment_method} {...register("payment_method")}>
                            <option value="">Selecione</option>
                            <option value="BILLET">Boleto</option>
                            <option value="PIX">Pix</option>
                            <option value="CARD">Cartão de crédito</option>
                        </Form.Select>
                        {errors.payment_method && <span className="text-danger">Escolha uma opção.</span>}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Categoria</Form.Label>
                        <Form.Select {...register("category")}>
                            <option value="">Selecione</option>
                            <option value="Lazer">Lazer</option>
                            <option value="Moradia">Moradia</option>
                            <option value="Alimentação">Alimentação</option>
                            <option value="Transporte">Transporte</option>
                            <option value="Saúde">Saúde</option>
                            <option value="Outros">Outros</option>
                        </Form.Select>
                    </Form.Group>

                    <DateInput setValue={setValue} register={register} name="date" error={errors.date} watch={watch}/>

                    
                    <div className='d-flex gap-2 justify-content-around'>
                        <Button type='button' className='w-100' variant="secondary" onClick={props.handleClose}>Cancelar</Button>
                        <Button type='submit' className='w-100 text-white' variant="primary">Adicionar</Button>
                    </div>
                </Form>
            </Modal.Body>
        </>
    );
};

export default AddTransactionModal;
