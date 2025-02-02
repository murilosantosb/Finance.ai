export interface apiRequestProps {
    endpoint: string;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: unknown;
    autoFetch?: boolean;
}