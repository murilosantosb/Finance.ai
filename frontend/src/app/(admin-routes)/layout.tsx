"use client";

import React, { useEffect } from "react";
//Next
import { useSession } from "next-auth/react";

//Components
import NavBar from "@/components/NavBar";

// hooks
import userStore from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";

interface PrivateLayoutProps {
	children: React.ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps){
	const { status, data } = useSession();
    const router = useRouter();
    const login = userStore((state) => state.login);

    const { refetch } = useFetch({
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

    // const { data: userData } = useFetch({
    //     endpoint: "/users/",
    //     method: "GET",
    //     autoFetch: false,
    // })

    useEffect(() => {
            if(status === "unauthenticated") {
                router.push("/")
            } else if(status === "authenticated" && data.user) {
                login({
                    id: data?.user.id || "",
                    name: data?.user?.name || "",
                    email: data?.user?.email || "",
                    image: data?.user?.image || "",
                })

                refetch();
            }
    }, [status, data, login, router, refetch]);

	return( 
    <>
            <NavBar />
            {children}
    </>
)
}
