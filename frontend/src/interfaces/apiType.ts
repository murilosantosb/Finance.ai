// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface apiRequestProps<T = unknown> {
    endpoint: string;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: unknown;
    autoFetch?: boolean;
}