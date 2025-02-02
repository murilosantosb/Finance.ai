// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            name: string;
            email: string;
            image: string;
            googleId: object | null,
            id: string | undefined;
            balance: number,
            investment: number,
            revenue: number,
            expenses: number,
        };
    }

    interface Token {
        name: string;
        email: string;
        image: string;
        id?: string;
      }
      
}
