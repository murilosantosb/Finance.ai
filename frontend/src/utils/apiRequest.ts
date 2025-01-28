

interface apiRequestProps {
    endpoint: string;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: any;
}

async function apiRequest({ endpoint, method, body }: apiRequestProps) {
    const baseUrl = "http://localhost:5000/api";
    const url = `${baseUrl}${endpoint}`;

    const options: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
        }
    }

    if(body) {
        options.body = JSON.stringify(body);
    }

    try {
        const responseData = await fetch(url, options);

        if(!responseData.ok) {
            const errorMessage = await responseData.text();
            throw new Error(`Erro ${responseData.status}: ${errorMessage}`);
        }
        return await responseData.json();
    } catch (error) {
        console.log("Erro ao fazer a requsição:", error);
    }
}

export default apiRequest;

