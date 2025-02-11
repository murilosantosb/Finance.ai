"use client";

import React, { useEffect, useState } from "react";
// Componentes
import TransactionItem from "./TransactionItem";
import Link from "next/link";

// Hooks
import { useFetch } from "@/hooks/useFetch";
import { useSession } from "next-auth/react";
import transactionStore from "@/store/transactionStore";

// Types
import { TransactionItemProps } from "@/interfaces/transactionType";

const TransactionMonthSelector: React.FC = () => {
  const { data: user } = useSession();
  const userGoogleId = user?.user?.googleId;
  const { transactions, setTransactions } = transactionStore();

  const { refetch, data, isLoading } = useFetch<{ userTransactions: TransactionItemProps[] }>({ 
    endpoint: userGoogleId ? `/transaction/user/${userGoogleId}` : "",
    method: "GET",
    autoFetch: false,
  });

  const [hasFetched, setHasFetched] = useState(false);

  // useEffect(() => {
  //   if (userGoogleId && !hasFetched) {
  //     refetch();
  //     setHasFetched(true);
  //   }
  // }, [userGoogleId, hasFetched, refetch]);

  // useEffect(() => {
  //   if(data?.userTransactions && userGoogleId) {
  //     setTransactions(data.userTransactions);
  //   }
  // }, [data, setTransactions, hasFetched, userGoogleId]);

  useEffect(() => {
    if(userGoogleId && !hasFetched) {
      refetch();
      setHasFetched(true);
    }
  } , [userGoogleId, refetch, hasFetched])

  useEffect(() => {
    if(data?.userTransactions) {
      setTransactions(data.userTransactions);
    }
  }, [data, setTransactions])

  return (
    <section className="transaction-month-selelector-container">
      <header className="transaction-month-header">
        <h1 className="text-white">Transações</h1>
        <Link href="/transaction" className="btn btn-secondary">
          Ver mais
        </Link>
      </header>

      <section>
        {isLoading ? (
          <p className="text-white">Carregando...</p>
        ) : transactions && transactions.length > 0 ? (
          transactions.map((transaction) => (
            <TransactionItem
            key={transaction._id}
            title={transaction.title}
            payment_method={transaction.payment_method}
            financial_category={transaction.financial_category}
            date={transaction.date}
            amount={transaction.amount}
            />
          ))
        ) : (
          <div className="text-white fw-bold d-flex align-items-center justify-content-center p-2">
            <p>Você ainda não fez nenhuma transação!</p>
          </div>
        )}
      </section>
    </section>
  );
};

export default TransactionMonthSelector;

