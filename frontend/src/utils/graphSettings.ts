import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import usePercentagesStore from "@/store/percentagesStore";

ChartJS.register(ArcElement, Tooltip, Legend);

// Hook para pegar os valores de porcentagem corretamente
export const getChartData = () => {
    const percentages = usePercentagesStore.getState().percentages;

    return {
        labels: ["Ganhos", "Gastos", "Investimentos"],
        datasets: [
            {
                data: [percentages.gain, percentages.spent, percentages.investment],
                backgroundColor: ["#55B02E", "#E93030", "#FFFFFF"],
                hoverBackgroundColor: ["#4a922c", "#ca3535", "#eeeeee"],
            },
        ],
    };
};

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            enabled: true,
            callbacks: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                label: (tooltipItem: any) => `${tooltipItem.raw} %`,
            },
        },
    },
    cutout: "85%",
    elements: {
        arc: {
            borderWidth: 0,
        },
    },
};

