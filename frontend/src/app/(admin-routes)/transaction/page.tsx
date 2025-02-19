"use client";

// Components
import Wrapper from "@/components/Wrapper";

import Link from "next/link";
import TableComponent from "@/components/Table";

// Icons
import { LuArrowUpDown } from "react-icons/lu";

export default function Transaction() {
    return (
     <Wrapper>
        <header className="transacion-header">
            <h1>Transações</h1>
            <Link href="/dashboard" className="btn btn-primary">
               Adicionar Transação
               <LuArrowUpDown />
            </Link>
        </header>
        <TableComponent />
     </Wrapper>
    );
  }
  