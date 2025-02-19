'use client'

// Hooks
import React, { useState } from 'react';
import { useTransactionUpdateForm } from '@/hooks/useTransactionUpdateForm';

// Componentes
import { Offcanvas, Button, Form } from 'react-bootstrap';
import DateInput from '../DateInput';
import BaseModal from './BaseModal';
import UpdateStatus from '../UpdateStatus';

// Icons
import { FiExternalLink } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";

const OffcanvasTransaction: React.FC = () => {
    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const { register, errors, onSubmit, handleSubmit, setValue, watch } = useTransactionUpdateForm();

  return (
    <>
        <Button className='td-icons' variant='dark' onClick={handleShow}> 
            <FiExternalLink />
        </Button>

        <Offcanvas className="transaction-offcanvas" show={show} onHide={handleClose} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className='text-white'>Transações</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group>
                        <Form.Label>Título</Form.Label>
                        <Form.Control {...register("title")} placeholder='Salário'/>
                        {errors.title && <span className='text-danger'>{errors.title.message}</span>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Valor</Form.Label>
                        <Form.Control type='number' {...register("amount")} placeholder='R$ 0.000,00'/>
                        {errors.amount && <span className='text-danger'>{errors.amount?.message}</span>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Método de pagamento</Form.Label>
                        <Form.Select {...register("payment_method")}>
                            <option value="PIX">Pix</option>
                            <option value="BILLET">Boleto</option>
                            <option value="CARD">Cartão</option>
                        </Form.Select>
                        {errors.payment_method && <span className='text-danger'>Selecione um método de pagamento</span>}
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
                        {errors.category && <span className='text-danger'>Selecione uma Categoria</span>}
                    </Form.Group>
                    <DateInput register={register} setValue={setValue} watch={watch} name='date' error={errors.date}/>
                    <BaseModal 
                        variant='modal_transition_delete'
                        button_variant='outline-danger'
                        button_title={<>Deletar Transação <IoTrashOutline /></>}
                    />

                    <UpdateStatus />

                    <section className='transaction-form-button-container'>
                        <Button type='button' variant='secondary' onClick={handleClose}>Cancelar</Button>
                        <Button type='submit' variant='primary' className='text-white'>Salvar</Button>
                    </section>
                </Form>
            </Offcanvas.Body>
        </Offcanvas>
    </>
  )
}

export default OffcanvasTransaction