import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

interface LayoutProps {
    children: React.ReactNode;
}


export default async function LayoutPublic({ children }: LayoutProps) {
    const session = await getServerSession()
    
    if(session) {
        redirect("/dashboard")
    }

    return (
        <>
            { children }
        </>
    )
}