"use client";
import React from 'react';

//Types
import { ModalProps } from '@/interfaces/modalType';

//Componentes
import { Modal, Form, Button } from "react-bootstrap"
import DateInput from '../DateInput';


interface AddTransactionModalProps extends ModalProps {
    title?: string;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = (props) => {
  return (
    <>
        <Modal.Header className='modal-header-add-transaction'>
            <Modal.Title>Adicionar Transação</Modal.Title>
            <p>Insira as informações abaixo</p>
        </Modal.Header>
        <Modal.Body className='modal-body-add-transaction'>
            <Form className='modal-form'>
                <Form.Group>
                    <Form.Label>Título</Form.Label>
                    <Form.Control type='text' placeholder='Título'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Valor</Form.Label>
                    <Form.Control type='number' placeholder='R$ 0.000,00'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Tipo da transação</Form.Label>
                    <Form.Select>
                        <option>Selecione</option>
                        <option value="gastos">Gasto</option>
                        <option value="ganhos">Ganho</option>
                        <option value="investimentos">Investimento</option>
                        <option value="depósito">Depósito</option>
                        <option value="saque">Saque</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Método de pagamento</Form.Label>
                    <Form.Select>
                        <option>Selecione</option>
                        <option value="boleto">Boleto</option>
                        <option value="pix">Pix</option>
                        <option value="crédito">Cartão de crédito</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Categoria</Form.Label>
                    <Form.Select>
                        <option>Selecione</option>
                        <option value="lazer">Lazer</option>
                        <option value="moradia">Moradia</option>
                        <option value="alimentação">Alimentação</option>
                        <option value="transporte">Transporte</option>
                        <option value="saúde">Saúde</option>
                    </Form.Select>
                </Form.Group>
                <DateInput />
            </Form>
        </Modal.Body>
        <Modal.Footer className='modal-footer'>
            <Button variant='secondary' onClick={props.handleClose}>
                Cancelar
            </Button>
            <Button variant='primary' onClick={props.handleClose}>
                Adicionar
            </Button>
        </Modal.Footer>
    </>
  )
}

export default AddTransactionModal