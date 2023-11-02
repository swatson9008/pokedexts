import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

interface PokeStat {
  name: string;
  base_stat: string;
}

export const options: any = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  title: {
    display: true,
    text: "Base Stats",
  },
  scales: {
    x: {
      type: 'linear',
      grid: { display: false },
      suggestedMax: 150,
      beginAtZero: true,
    },
  },
};

const labels = [
  "HP",
  "Attack",
  "Defense",
  "Special Attack",
  "Special Defense",
  "Speed",
];

export const data = {
  labels,
  datasets: [
    {
      data: labels.map((data) => parseInt(data)),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export function baseStatBarChart(pokeStats: PokeStat[]) {
  data.datasets[0].data = pokeStats.map((stat: { base_stat: string }) =>
    parseInt(stat.base_stat)
  );
  return <Bar options={options} data={data} />;
}
