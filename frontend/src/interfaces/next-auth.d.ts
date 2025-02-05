// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string | undefined;
            name: string;
            email: string;
            image: string;
            googleId: string | undefined,
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

      interface Profile {
        picture: string,
      }
}
