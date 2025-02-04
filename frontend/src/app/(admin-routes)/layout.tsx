"use client";

import React, { useEffect } from "react";
//Next
import { useSession } from "next-auth/react";

//Components
import NavBar from "@/components/NavBar";

// hooks
import userStore from "@/store/userStore";
import financeStore from "@/store/financeStore";
import { useRouter } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";

// Types
import { UserFinance } from "@/interfaces/userType";

interface PrivateLayoutProps {
	children: React.ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps){
	const { status, data } = useSession();
    const router = useRouter();
    const { login, user } = userStore((state) => state);
    const { setUserFinance } = financeStore((state) => state)

    const { refetch: loginRefetch } = useFetch({
        endpoint:"/users/login",
        method: "POST",
        body: data?.user
        ? {
            name: data?.user.name || "",
            email: data?.user.email || "",
            image: data?.user.image || "",
            googleId: data?.user.googleId || null,
            balance: data?.user?.balance || 0,
            investment: data?.user?.investment || 0,
            revenue: data?.user?.revenue || 0,
            expenses: data?.user?.expenses || 0,
        }
        : null,
       autoFetch: false, 
    })

    const {data: userData, refetch: fetchFinance} = useFetch<UserFinance>({
        endpoint: `/users/finance/${user.googleId}`,
        method: "GET",
        autoFetch: false,
    })

    useEffect(() => {
            if(status === "unauthenticated") {
                router.push("/")
            } else if(status === "authenticated" && data?.user) {
                
                if(!user.googleId && data?.user?.googleId) {
                    login({
                        id: data?.user.id || "",
                        name: data?.user?.name || "",
                        email: data?.user?.email || "",
                        image: data?.user?.image || "",
                        googleId: data?.user.googleId || null,
                    })
                }

                if(!userData && data?.user?.googleId) {
                    fetchFinance().then((response) => {
                        // console.log('Finance API Response:', response);
                        if(response?.data) {
                            setUserFinance(response.data);
                        }else {
                            console.error("Erro ao buscar dados financeiros:");
                        }
                    })
                }

                if(!user.googleId && data?.user?.googleId) {
                    loginRefetch().then((response) => {
                        console.log("Login response:", response)
                    })
                }
                
            }
    }, [status, data?.user, login, router, fetchFinance, setUserFinance, userData, loginRefetch, user.googleId]);

	return( 
    <>
            <NavBar />
            {children}
    </>
)
}
