"use client";

import React, { useEffect } from "react";
//Next
import { useSession } from "next-auth/react";

//Components
import NavBar from "@/components/NavBar";

// hooks
import { useRouter } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import userStore from "@/store/userStore";

//Types
import { UserProps } from "@/interfaces/userType";

interface UserDataProps {
  user: UserProps;
}

interface PrivateLayoutProps {
	children: React.ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps){
	const { status, data } = useSession();
    const router = useRouter();
    const { getUserData, user } = userStore();

    const { data: userData, refetch } = useFetch<UserDataProps>({
      endpoint: `/users/${data?.user.googleId}`,
      method: "GET",
      autoFetch: false,
    })
    
    useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/");
        return;
      }

      // Busca os dados do usuário APENAS se ainda não estiverem carregados
      if (status === "authenticated" && data?.user?.googleId && !userData) {
          refetch();
      }
  }, [status, data?.user, userData, refetch, router]);

  // Atualiza o Zustand com os dados do usuário quando carregados
  useEffect(() => {
      if (userData && userData.user.id !== user.id) {
          getUserData({
            id: userData.user.id,
            name: userData.user.name,
            email: userData.user.email,
            googleId: userData.user.googleId,
            image: userData.user.image,
            balance: userData.user.balance,
            investment: userData.user.investment,
            revenue: userData.user.revenue,
            expenses: userData.user.expenses,
          });
      }
  }, [userData, getUserData, user.id]);
    


	return( 
    <>
      <NavBar />
      {children}
    </>
)
}
