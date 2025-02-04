import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface userProps{
        name: string | null | undefined,
        email: string | null | undefined,
        image: string | null | undefined | StaticImport,
        id: string,
        googleId?: string | null;
        balance?: number,
        investment?: number,
        revenue?: number,
        expenses?: number,
}

export interface UserFinance {
        _id: string;
        balance: number;
        investment: number;
        revenue: number;
        expenses: number;
        fetchFinanceData: (googleId: string) => Promise<void>;
}