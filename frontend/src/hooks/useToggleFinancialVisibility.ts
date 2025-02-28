"use client";

import userStore from "@/store/userStore";

const useToggleFinancialVisibility = () => {
    const { financialVisibility, setFinancialVisibility } = userStore();

    const toggleVisibility = () => {
        setFinancialVisibility(financialVisibility === "visible" ? "invisible" : "visible");
    };

    return { financialVisibility, toggleVisibility }
};

export default useToggleFinancialVisibility;
