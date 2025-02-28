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
import PaginationComponent from './PaginationComponent';

// Store
import transactionStore from '@/store/transactionStore';
import pagesStore from '../store/pagesStore';

// Icons
import { IoTrashOutline } from "react-icons/io5";

// Utils
import { formatDate } from "@/utils/formatDate";
import realToCents from '@/utils/realToCents';

// Types
import { TransactionsResponse } from '@/interfaces/transactionType';


const TableComponent: React.FC = () => {
    const [lastFetchedPage, setLastFetchedPage] = useState<number | null>(null);
    const [totalPages, setTotalPages] = useState<number | undefined>(1);
    const { transactions, setTransactions } = transactionStore();
    const { page } = pagesStore();
    const { data: user } = useSession();
    
    const { data, refetch: getUserTransactions } = useFetch<TransactionsResponse>({
            endpoint: user?.user.googleId ? `/transaction/user/${user?.user.googleId}?page=${page}&limit=14` : "",
            method: "GET",
            autoFetch: false,
    });

    useEffect(() => {
        if(user?.user.googleId && page && page !== lastFetchedPage) {
            getUserTransactions();
            setLastFetchedPage(page);
        }
    }, [getUserTransactions, user?.user.googleId, page, lastFetchedPage])

    useEffect(() => {
        if(data?.userTransactions) {
            setTransactions(data.userTransactions);
            setTotalPages(data.totalPages);
        }
    }, [data?.userTransactions, setTransactions, data?.totalPages])

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
            
           <PaginationComponent totalPages={Number(totalPages)}/>
    </>
  )
}

export default TableComponent;