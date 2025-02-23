"use client";

// Hooks
import React, { useState, useEffect } from 'react'
import { useFetch } from '@/hooks/useFetch';
import { useSession } from 'next-auth/react';

//Componentes
import BadgeComponent from './Badge';
import { Table } from "react-bootstrap";
import OffcanvasTransaction from './Modal/OffcanvasTransaction';
import BaseModal from './Modal/BaseModal';

// Store
import transactionStore from '@/store/transactionStore';

// Icons
import { IoTrashOutline } from "react-icons/io5";

// Utils
import { formatDate } from "@/utils/formatDate";
import realToCents from '@/utils/realToCents';

// Types
import { TransactionItemProps } from '@/interfaces/transactionType';


const TableComponent: React.FC = () => {
    const [hasFetched, setHasFetched] = useState(false);
    const { transactions, setTransactions } = transactionStore();
    const { data: user } = useSession();
    
    const { data, refetch: getUserTransactions } = useFetch<{userTransactions: TransactionItemProps[]}>({
            endpoint: user?.user.googleId ? `/transaction/user/${user?.user.googleId}?limit=14` : "",
            method: "GET",
            autoFetch: false,
    });

    useEffect(() => {
        if(user?.user.googleId && !hasFetched) {
            getUserTransactions();
            setHasFetched(true);
        }
    }, [getUserTransactions, hasFetched, user?.user.googleId])

    useEffect(() => {
        if(data?.userTransactions) {
            setTransactions(data.userTransactions);
        }
    }, [data?.userTransactions, setTransactions])

  return (
    <>
        <Table hover responsive className='transaction-table'>
            <thead className='transaction-table-header'>
                <tr>
                    <th className='col-2'>Nome</th>
                    <th className='col-2'>Tipo</th>
                    <th className='col-2'>Categoria</th>
                    <th className='col-2'>Método</th>
                    <th className='col-2'>Data</th>
                    <th>Valor</th>
                    <th />
                    <th />
                </tr>
            </thead>
            <tbody>
                {transactions && transactions.length ? (
                    transactions.map((transaction) => (
                            
                 
                    <tr key={transaction._id}>
                        <td>{transaction.title}</td>
                        <td>
                            <BadgeComponent variant={transaction.financial_category}/>
                        </td>
                        <td>{transaction.category ? transaction.category : "-"}</td>
                        <td>
                            {transaction.payment_method === "PIX" ? "Pix" : transaction.payment_method === "CARD" ? "Cartão" : "Boleto"}
                        </td>
                        <td className='data'>{formatDate(transaction.date)}</td>
                        <td>{realToCents({variant: "cents_to_real", money: transaction.amount})}</td>
                        <td>
                            <OffcanvasTransaction _id={transaction._id}/>
                        </td>
                        <td>
                            <BaseModal 
                                variant='modal_transition_delete'
                                button_title={<IoTrashOutline className='td-icons'/>}
                                button_variant='none'
                                _id={transaction._id}
                            />
                        </td>
                    </tr>
                    
                      
                    ))) : (
                    <tr>
                        <td className='w-25 text-white bg-transparent h2'>Ainda não há transações</td>
                    </tr>
                )}
            </tbody>
        </Table>
    </>
  )
}

export default TableComponent;














{/* <tr>
    <td>Salário</td>
    <td>
        <BadgeComponent variant='SPENT'/>
    </td>
    <td>Outros</td>
    <td>Pix</td>
    <td className='data'>28 de Março 2023</td>
    <td>R$ 1.750.00</td>
    <td className='td-icons-container'>
        <OffcanvasTransaction />
        <IoTrashOutline className='td-icons'/>
    </td>
</tr>

<tr>
    <td>Salário</td>
    <td>
        <BadgeComponent variant='INVESTMENT'/>
    </td>
    <td>Outros</td>
    <td>Pix</td>
    <td className='data'>28 de Março 2023</td>
    <td>R$ 1.750.00</td>
    <td className='td-icons-container'>
        <OffcanvasTransaction />
        <IoTrashOutline className='td-icons'/>
    </td>
</tr> */}