import { apiRequestProps } from "@/interfaces/apiType";

async function apiRequest<T>({ endpoint, method, body, autoFetch = true }: apiRequestProps<T | null>) {
    const baseUrl = "http://localhost:5000/api";
    const url = `${baseUrl}${endpoint}`;

    const options: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
    }

    try {
        if(autoFetch) {
        const responseData = await fetch(url, options);

        if(!responseData.ok) {
            const errorMessage = await responseData.text();
            throw new Error(`Erro ${responseData.status}: ${errorMessage}`);
        }
        return (await responseData.json()) as T;
    }
    } catch (error) {
        console.log("Erro ao fazer a requisição:", error);
        throw error;
    }

    return null;
}

export default apiRequest;

