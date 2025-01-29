"use client"

import FinancialSummaryGroup from "@/components/Cards/FinancialSummaryGroup";
import Wrapper from "@/components/Wrapper";
import {FileText} from 'react-bootstrap-icons'

export default function Dashboard() {

    return (
  <Wrapper>
    <header className="d-flex justify-content-between align-items-center">
      <h1 className="h3  text-white">Dashboard</h1>
      <span className="d-flex align-items-center">
        <button className="btn btn-outline-light align-self-center text-center">
          Relatório IA
          {/* <i className="bi bi-file-text"></i> */}
          <FileText size={20}/>
        </button>
        <button className=" btn btn-outline-light m-2">Novembro</button>  
      </span> 
    </header>
    <main className="dashboard-container">
        <FinancialSummaryGroup />
    </main>
  </Wrapper>
    );
  }
  