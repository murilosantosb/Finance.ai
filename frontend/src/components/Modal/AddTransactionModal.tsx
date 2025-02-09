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

                    <Button type="submit" variant="outline-light">Enviar</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer className="modal-footer">
                <Button variant="secondary" onClick={props.handleClose}>Cancelar</Button>
                <Button variant="primary" onClick={props.handleClose}>Adicionar</Button>
            </Modal.Footer>
        </>
    );
};

export default AddTransactionModal;




















































// "use client";
// import React from 'react';

// //Types
// import { ModalProps } from '@/interfaces/modalType';

// //Componentes
// import { Modal, Form, Button } from "react-bootstrap";
// import DateInput from '../DateInput';

// // Zod and hookForm
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { transactionSchema } from '@/schemas/transactionSchema';
// import { z } from "zod";

// type FormData = z.infer<typeof transactionSchema>;

// interface AddTransactionModalProps extends ModalProps {
//     title?: string;
// }

// const AddTransactionModal: React.FC<AddTransactionModalProps> = (props) => {

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         reset,
//     } = useForm<FormData>({
//         resolver: zodResolver(transactionSchema),
//         defaultValues: {
//             title: "",
//             financial_category: undefined,
//             category: undefined,
//             amount: 0,
//             payment_method: undefined,
//             date: new Date(),
//             userId: "",
//         },
//     });

//     const handleFormState = (data: FormData) => {
//         console.log("Dados enviados:", data);
//         reset();
//         props.handleClose();
//     }

//   return (
//     <>
//         <Modal.Header className='modal-header-add-transaction'>
//             <Modal.Title>Adicionar Transação</Modal.Title>
//             <p>Insira as informações abaixo</p>
//         </Modal.Header>
//         <Modal.Body className='modal-body-add-transaction'>
//             <Form onSubmit={handleSubmit(handleFormState)} className='modal-form'>
//                 <Form.Group>
//                     <Form.Label>Título</Form.Label>
//                     <Form.Control aria-invalid={!!errors.title} {...register("title")} type='text' placeholder='Título'/>
//                     {errors.title && <span className="text-danger">{errors.title.message}</span>}
//                 </Form.Group>
//                 <Form.Group>
//                     <Form.Label>Valor</Form.Label>
//                     <Form.Control aria-invalid={!!errors.amount} {...register("amount")} type='number' placeholder='R$ 0.000,00'/>
//                     {errors.amount && <span className="text-danger">{errors.amount.message}</span>}
//                 </Form.Group>
//                 <Form.Group>
//                     <Form.Label>Tipo da transação</Form.Label>
//                     <Form.Select aria-invalid={!!errors.financial_category} {...register("financial_category")}>
//                         <option value="">Selecione</option>
//                         <option value="GAIN">Gasto</option>
//                         <option value="SPENT">Ganho</option>
//                         <option value="INVESTMENT">Investimento</option>
//                         <option value="DEPOSIT">Depósito</option>
//                         <option value="SAKE">Saque</option>
//                     </Form.Select>
//                     {errors.financial_category && <span className="text-danger">Escolha umas das opções acima.</span>}
//                 </Form.Group>
//                 <Form.Group>
//                     <Form.Label>Método de pagamento</Form.Label>
//                     <Form.Select aria-invalid={!!errors.payment_method} {...register("payment_method")}>
//                         <option value="">Selecione</option>
//                         <option value="BILLET">Boleto</option>
//                         <option value="PIX">Pix</option>
//                         <option value="CARD">Cartão de crédito</option>
//                     </Form.Select>
//                     {errors.payment_method && <span className="text-danger">Escolha umas das opções acima.</span>}
//                 </Form.Group>
//                 <Form.Group>
//                     <Form.Label>Categoria</Form.Label>
//                     <Form.Select {...register("category")}>
//                         <option value="">Selecione</option>
//                         <option value="Lazer">Lazer</option>
//                         <option value="Moradia">Moradia</option>
//                         <option value="Alimentação">Alimentação</option>
//                         <option value="Transporte">Transporte</option>
//                         <option value="Saúde">Saúde</option>
//                     </Form.Select>
//                 </Form.Group>
//                 <DateInput setValue={} register={register} name='date' error={errors.date}/>
//                 <Button type='submit' variant='outline-light'>Enviar</Button>
//             </Form>
//         </Modal.Body>
//         <Modal.Footer className='modal-footer'>
//             <Button variant='secondary' onClick={props.handleClose}>
//                 Cancelar
//             </Button>
//             <Button variant='primary' onClick={props.handleClose}>
//                 Adicionar
//             </Button>
//         </Modal.Footer>
//     </>
//   )
// }

// export default AddTransactionModal