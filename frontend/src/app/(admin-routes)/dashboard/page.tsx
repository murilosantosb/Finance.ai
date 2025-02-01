
//Components
import FinancialSummaryGroup from "@/components/Cards/FinancialSummaryGroup";
import Wrapper from "@/components/Wrapper";
import FinanceChart from "@/components/Cards/FinanceChart";
import ExpenseCategoryProgress from "@/components/Cards/ExpenseCategoryProgress";
import TransactionMonthSelector from "@/components/Cards/TransactionMonthSelector";
import DropdownButtonComponent from "@/components/DropdownButton";
import BaseModal from "@/components/Modal/BaseModal";

//Icons
import { FiFileText } from "react-icons/fi";

export default function Dashboard() {

    return (
  <Wrapper>
    <header className="d-flex justify-content-between align-items-center">
      <h1 className="h3 text-white">Dashboard</h1>
      <span className="d-flex align-items-center gap-2">
      <BaseModal
         button_title={<>Relatório IA <FiFileText /></>}
         button_variant="outline-light" 
         variant="IA"
         /> 
        <DropdownButtonComponent />  
      </span> 
    </header>
    <main className="dashboard-container">
        <FinancialSummaryGroup />
        <TransactionMonthSelector />
        <div className="dashboard-graphics">
          <FinanceChart />
          <ExpenseCategoryProgress />
        </div>
    </main>
  </Wrapper>
    );
}
  