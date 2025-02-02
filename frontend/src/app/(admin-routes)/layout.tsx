"use client";

import React, { useEffect } from "react";
//Next
import { useSession } from "next-auth/react";

//Components
import NavBar from "@/components/NavBar";

// hooks
import userStore from "@/store/userStore";
import { useRouter } from "next/navigation";
//API
import apiRequest from "@/utils/apiRequest";

interface PrivateLayoutProps {
	children: React.ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps){
	const { status, data } = useSession();
    const router = useRouter();
    const login = userStore((state) => state.login);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const sendUserDataToBackend = async () => {
        if(status === "authenticated" && data?.user) {
            try {
               await apiRequest(
                    {
                        endpoint:"/users/login",
                        method: "POST",
                        body:{
                            name: data.user.name || "",
                            email: data?.user.email || "",
                            image: data?.user.image || "",
                            googleId: data.user.googleId || null,
                            balance: data?.user?.balance || 0,
                            investment: data?.user?.investment || 0,
                            revenue: data?.user?.revenue || 0,
                            expenses: data.user?.expenses || 0,
                        },
                    });
            } catch (error) {
                console.error("Erro ao enviar os dados do usuário", error)
            }
        }
    }

    useEffect(() => {
            if(status === "unauthenticated") {
                router.push("/")
            } else if(status === "authenticated" && data.user) {
                login({
                    id: data?.user.id || "",
                    name: data?.user?.name || "",
                    email: data?.user?.email || "",
                    image: data?.user?.image || "",
                    balance: data?.user?.balance || 0,
                    investment: data?.user?.investment || 0,
                    revenue: data?.user?.revenue || 0,
                    expenses: data.user?.expenses || 0,
                })

                sendUserDataToBackend()
            }

    }, [status, data, login, router, sendUserDataToBackend]);

	return( 
    <>
            <NavBar />
            {children}
    </>
)
}
