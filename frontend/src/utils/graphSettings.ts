
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend)

interface DoughnutChartData {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      hoverBackgroundColor: string[];
    }[];
}

export const data: DoughnutChartData = {
    labels: ["Ganhos", "Gastos", "Investimentos"],
    datasets: [
        {
            data: [60,22,18],
            backgroundColor: ["#55B02E", "#E93030", "#FFFFFF"],
            hoverBackgroundColor: ["#4a922c", "#ca3535", "#eeeeee"],
        }
    ]
}
 
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