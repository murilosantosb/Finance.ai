"use client";

import React, { useEffect, useState } from "react";
// Componentes
import TransactionItem from "./TransactionItem";
import Link from "next/link";

// Hooks
import { useFetch } from "@/hooks/useFetch";
import { useSession } from "next-auth/react";

// Types
import { TransactionItemProps } from "@/interfaces/transactionType";

const TransactionMonthSelector: React.FC = () => {
  const { data: user } = useSession();
  const userGoogleId = user?.user?.googleId;

  const { refetch, data, isLoading } = useFetch<{ userTransactions: TransactionItemProps[] }>({
    endpoint: userGoogleId ? `/transaction/user/${userGoogleId}` : "",
    method: "GET",
    autoFetch: false,
  });

  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (userGoogleId && !hasFetched) {
      refetch();
      setHasFetched(true);
    }
  }, [userGoogleId, hasFetched, refetch]);

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
        ) : data?.userTransactions?.length ? (
          data.userTransactions.map((transactions) => (
            <TransactionItem
              key={transactions._id}
              title={transactions.title}
              payment_method={transactions.payment_method}
              financial_category={transactions.financial_category}
              date={transactions.date}
              amount={transactions.amount}
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







































// "use client"

// import React, { useMemo, useEffect, useCallback, useState } from 'react'
// //Componentes
// import TransactionItem from './TransactionItem';
// import Link from 'next/link';

// // hooks
// import { useFetch } from '@/hooks/useFetch';
// import { useSession } from 'next-auth/react';

// // Types
// import { TransactionItemProps } from '@/interfaces/transactionType';

// interface UserTransactionsProps {
//   userTransactions: TransactionItemProps[];
// }

// const TransactionMonthSelector: React.FC = () => {
//   const { data: user, } = useSession();

//   const userGoogleId = useMemo(() => user?.user?.googleId, [user?.user?.googleId]);

//   const { refetch, data } = useFetch<UserTransactionsProps>({
//     endpoint: userGoogleId ? `/transaction/user/${userGoogleId}` : "",
//     method: "GET",
//     autoFetch: false,
//   });

//   const [hasFetched, setHasFetched] = useState(false);

//   const stableRefetch = useCallback(() => {
//     if (userGoogleId && !hasFetched) {
//       refetch();
//       setHasFetched(true);
//     }
//   }, [userGoogleId, refetch, hasFetched]); 

//   useEffect(() => {
//     stableRefetch();
//     console.log("API chamada");
//   }, [stableRefetch]);

//   return (
//     <section className='transaction-month-selelector-container'>
//         <header className='transaction-month-header'>
//           <h1 className='text-white'>Transações</h1>
//             <Link href="/transaction" className='btn btn-secondary'>
//               Ver mais
//             </Link>
//         </header>

//         <section>
//           {data?.userTransactions?.length ? (
//             data.userTransactions.map((transactions) => (
//              <TransactionItem
//                 key={transactions._id}
//                 title={transactions.title}
//                 payment_method={transactions.payment_method}
//                 financial_category={transactions.financial_category}
//                 date={transactions.date}
//                 amount={transactions.amount}
//               />
//             ))
//           ) : (
//             <div className='text-white fw-bold d-flex align-items-center justify-content-center p-2'>
//               <p>Você ainda não fez nenhuma transação!</p>
//             </div>
//           )}
//         </section>

//     </section>
//   )
// }

// export default TransactionMonthSelector;