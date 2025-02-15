
type PercentagesTypes = {
    gain: number;
    spent: number;
    investment: number;
}

export interface PercentagesProps {
    percentages: {
        gain: number;
        spent: number;
        investment: number;
    };

    calculateUserPencentages: (percentages: PercentagesTypes) => void;
};