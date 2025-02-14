
export interface UserProps {
        name: string;
        email: string;
        image: string;
        googleId: object | null;
        id: string | undefined;
        balance: number;
        investment: number;
        revenue: number;
        expenses: number;
};

export interface UserFinanceProps {
        user: {
                balance: number;
                investment: number;
                revenue: number;
                expenses: number
        }
}

export interface UserState {
        user: {
            name: string;
            email: string;
            image: string;
            googleId: object | null;
            id: string | undefined;
            balance: number;
            investment: number;
            revenue: number;
            expenses: number;
        };
        getUserData: (user: UserProps | null) => void;
        getFinanceOfUser: (finance: UserFinanceProps | null) => void;
};