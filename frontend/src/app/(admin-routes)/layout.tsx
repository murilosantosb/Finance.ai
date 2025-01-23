"use client";

import React, { useEffect } from "react";
//Next
import { useSession } from "next-auth/react";

//Components
import NavBar from "@/components/NavBar";

// hooks
import userStore from "@/store/userStore";
import { useRouter } from "next/navigation";

interface PrivateLayoutProps {
	children: React.ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps){
	const session = useSession();
    const router = useRouter();
    const login = userStore((state) => state.login);

    useEffect(() => {
        if(session.status === "unauthenticated") {
            router.push("/")
        } else if(session.status === "authenticated") {
            login({
                name: session.data?.user?.name || "",
                email: session?.data?.user?.email || "",
                image: session?.data?.user?.image || "",
            })
        }
    }, [session.status, router, login, session]);
    



    if(session.status === "loading") {
        return (
        <div className="spinner-grow text-primary d-flex align-items-center justify-content-center" role="status">
         <span className="visually-hidden">Loading...</span>
        </div>
        )
    }


	return( 
    <>
            <NavBar />
            {children}
    </>
)
}