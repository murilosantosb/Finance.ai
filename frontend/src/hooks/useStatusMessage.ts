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





























// "use client";

// import { useState, useEffect } from "react";

// const useStatusMessage = () => {
//     const [statusMessage, setStatusMessage] = useState<"success" | "alert">("alert");

//     // useEffect(() => {
//     //     if(statusMessage === "alert") {
//     //         console.log("✅ Mudou para SUCCESS", statusMessage); 
//     //         const timer = setTimeout(() => {
//     //             console.log("🔄 Voltando para ALERT");
//     //             setStatusMessage("success");
//     //         }, 5000);

//     //         return () => clearTimeout(timer);
//     //     }
//     // }, [statusMessage]);

//     return { statusMessage, setStatusMessage };
// }

// export default useStatusMessage;