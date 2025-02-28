"use client";

// Hooks
import React, { useState } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { useSession } from 'next-auth/react';
import transactionStore from '@/store/transactionStore';
import userStore from '@/store/userStore';
import pagesStore from '@/store/pagesStore';

// Types
import { ModalProps } from '@/interfaces/modalType';
import { TransactionsResponse } from "@/interfaces/transactionType";
import { UserFinanceProps } from '@/interfaces/userType';
// Components
import { Modal, Button } from 'react-bootstrap';
//Icons
import { IoCloseCircleOutline } from "react-icons/io5";

interface DeleteModalProps extends ModalProps {
  variant: "modal_delete" | "modal_alert";
  _id?: string;
  onDeleteSuccess?: () => void;
}

const DeleteTransactionModal: React.FC<DeleteModalProps> = (props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { data: user } = useSession();
  const { setTransactions } = transactionStore();
  const { getFinanceOfUser } = userStore();
  const { page } = pagesStore();

  const { refetch: deleteTransaction } = useFetch({
    endpoint: `/transaction/${props._id}`,
    method: "DELETE",
    autoFetch: false,
  })

  const { refetch: getUserTransactions } = useFetch<TransactionsResponse>({ //{ userTransactions: TransactionItemProps[] }
    endpoint: user?.user.googleId ? `/transaction/user/${user?.user.googleId}?page=${page}` : "",
    method: "GET",
    autoFetch: false,
  })

  const { refetch: refetchUserFinances, } = useFetch<{ user: UserFinanceProps}>({
    endpoint: user?.user.googleId ? `/users/finances/${user.user.googleId}` : "",
    method: "GET",
    autoFetch: false,
  });


  const handleDeleteTransaction = async () => {
    if(!props._id || isDeleting) return;

    setIsDeleting(true);

    try {
      await deleteTransaction();
      const updatedTransactions = await getUserTransactions();
      const updatedUserFinances = await refetchUserFinances();

      if(updatedTransactions.data?.userTransactions) {
        setTransactions(updatedTransactions.data.userTransactions);
      };

      if(updatedUserFinances.data?.user) {
        getFinanceOfUser(updatedUserFinances.data.user);
      };

      props.onDeleteSuccess?.();
    } catch (error) {
      console.error("Erro ao deletar transação:", error);
    }finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
    <Modal.Header className='modal-header'>
            {props.variant === "modal_delete" ? (
              <>
                <IoCloseCircleOutline size={25} className='bg-danger text-black rounded-5'/>
                <Modal.Title>Deseja deletar essa transação?</Modal.Title>
              </>
            ) :  (
              <Modal.Title>Transação deletada!</Modal.Title>
            )}
    </Modal.Header>
    <Modal.Body className="modal-body-custom">
      {props.variant === "modal_delete" ? (
        <p>Uma vez deletada não poderá recuperá-la.</p>
      ) :  (
        <p>A transação foi deletada do sistema.</p>
      )}
    </Modal.Body>
    <Modal.Footer className='modal-footer'>
          {props.variant === "modal_delete" ? (
            <>
              <Button variant='secondary' onClick={props.handleClose}>
                  Cancelar
              </Button>
              <Button className='btn btn-danger text-white' onClick={() => handleDeleteTransaction()}>
                  Deletar
              </Button>
            </>
          ) : (
            <Button variant='secondary' onClick={props.handleClose}>
              Confirmar
            </Button>
          )}
    </Modal.Footer>
  </> 
  )
}

export default DeleteTransactionModal