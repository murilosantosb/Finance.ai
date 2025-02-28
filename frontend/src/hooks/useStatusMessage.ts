"use client";
import { useState } from "react";

let globalSetStatusMessage: React.Dispatch<React.SetStateAction<"success" | "alert">> | null = null;

const useStatusMessage = () => {
    const [statusMessage, setStatusMessage] = useState<"success" | "alert">("alert");

        globalSetStatusMessage = setStatusMessage;
    
    return { statusMessage, setStatusMessage };
};

export const setGlobalStatusMessage = (status: "success" | "alert") => {
    const updateStatus = globalSetStatusMessage;

    if (updateStatus) {
        setTimeout(() => {
          updateStatus(status);
        }, 1200)
    }
};

export default useStatusMessage;