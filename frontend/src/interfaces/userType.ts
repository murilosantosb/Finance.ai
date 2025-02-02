import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface userProps{
        name: string | null | undefined,
        email: string | null | undefined,
        image: string | null | undefined | StaticImport,
        id: string,
        googleId?: object | null;
        balance?: number,
        investment?: number,
        revenue?: number,
        expenses?: number,
}
