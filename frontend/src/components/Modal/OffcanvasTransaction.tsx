'use client'

// Hooks
import React, { useEffect, useState } from 'react';
import { useTransactionUpdateForm } from '@/hooks/useTransactionUpdateForm';
import transactionStore from '@/store/transactionStore';

// Componentes
import { Offcanvas, Button, Form } from 'react-bootstrap';
import DateInput from '../DateInput';
import BaseModal from './BaseModal';
import UpdateStatus from '../UpdateStatus';

// Icons
import { FiExternalLink } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";

// Types
import { TransactionItemProps } from '@/interfaces/transactionType';

interface OffCanvasProps {
    _id: string | undefined,
}

const OffcanvasTransaction: React.FC<OffCanvasProps> = ({ _id }) => {
    const [show, setShow] = useState<boolean>(false);
    const [transactionId, setTransactionId] = useState<TransactionItemProps | null>(null)
    const { transactions } = transactionStore();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const { register, errors, onSubmit, handleSubmit, setValue, watch } = useTransactionUpdateForm(_id);
    const amount = Number(transactionId?.amount) / 100;

    useEffect(() => {
        if(_id && show) {
            const selectedTransaction = transactions.find(transaction => transaction._id === _id);

            if(selectedTransaction) {
                setTransactionId(selectedTransaction);

                setValue("title", selectedTransaction.title);
                setValue("amount", Number(selectedTransaction?.amount) / 100);
                setValue("payment_method", selectedTransaction.payment_method);
                setValue("category", selectedTransaction.category);
                setValue("date", selectedTransaction.date as Date);
            }
        }
    }, [_id, setValue, show, transactions])

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
                        <Form.Control defaultValue={transactionId?.title} {...register("title")} placeholder='Salário'/>
                        {errors.title && <span className='text-danger'>{errors.title.message}</span>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Valor</Form.Label>
                        <Form.Control defaultValue={amount} type='number' {...register("amount")} placeholder='R$ 0.000,00'/>
                        {errors.amount && <span className='text-danger'>{errors.amount?.message}</span>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Método de pagamento</Form.Label>
                        <Form.Select defaultValue={transactionId?.payment_method} {...register("payment_method")}>
                            <option value="PIX">Pix</option>
                            <option value="BILLET">Boleto</option>
                            <option value="CARD">Cartão</option>
                        </Form.Select>
                        {errors.payment_method && <span className='text-danger'>Selecione um método de pagamento</span>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Categoria</Form.Label>
                        <Form.Select defaultValue={transactionId?.category} {...register("category")}>
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
                        _id={_id}
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