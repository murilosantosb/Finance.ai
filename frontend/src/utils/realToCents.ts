

interface realToCentsProps {
    money: number;
    variant: "real_to_cents" | "cents_to_real";
}

export default function realToCents({ money, variant } : realToCentsProps) {
    let amount: number;

    if(variant === "cents_to_real") {
        amount = money / 100;

        return amount.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        })
    } else {
        amount = Math.round(money * 100);
        return amount;
    }
}
