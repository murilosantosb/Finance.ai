"use client";

import React, { useEffect, useState } from 'react'

//Componentes
import { ProgressBar } from "react-bootstrap"

// Hooks
import { useFetch } from '@/hooks/useFetch';
import { useSession } from 'next-auth/react';
import categoriesStore from '@/store/categoriesStore';

// Utils
import realToCents from '@/utils/realToCents';

// Types
import { CategoryTypeProps } from '@/interfaces/categoriesType';



const ExpenseCategoryProgress: React.FC = () => {
    const { data: user } = useSession();
    const [hasFetched, setHasFetched] = useState(false);
    const { categories, setUserCategories } = categoriesStore();

    const totalAmount = categories.reduce((acc, category) => acc + category.amount, 0);

    const { refetch, data } = useFetch<{ categories: CategoryTypeProps[] }>({
        endpoint: user?.user.googleId ? `/category/${user?.user.googleId}` : "",
        method: "GET",
        autoFetch: false,
    });

    useEffect(() => {
        if(user?.user.googleId && !hasFetched) {
            refetch();
            setHasFetched(true);
        }
    }, [hasFetched, refetch, setUserCategories, user?.user.googleId])

    useEffect(() => {
        if(data?.categories) {
            setUserCategories(data?.categories || []);
        }
    }, [data, setUserCategories])

  return (
    <section className='expense-category-container'>
        <h1>Gastos por categoria</h1>

        <section className='expense-category-content'>
             
            {categories && categories.length ? (
                categories.map((category) => {
                    const percentage = totalAmount > 0 ? (category.amount / totalAmount) * 100 : 0;

                return (
                    <div key={category._id}>
                        <span>
                            <p>{category.name}</p>
                            <p>{percentage.toFixed(0)}%</p>
                         </span>
                        <ProgressBar variant='info' now={percentage}/>
                        <p className='text-info fw-bolder mt-1'>{realToCents({ variant: "cents_to_real", money: category.amount })}</p>
                    </div> 
                )})
            ) : (
                <div className='mt-4'>
                    <h2 className=' text-dark-emphasis'>Você ainda não criou transações.</h2>
                </div>
            ) 
            }  

        </section>
    </section>
  )
}

export default ExpenseCategoryProgress

