import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartDataLabels);

interface PokeStat {
  name: string;
  base_stat: string;
}

export const options: any = {
  plugins: {
    datalabels: {
      display: true, 
      anchor: "end", 
      align: "right", 
      font: {
        weight: "bold",
      },
    },
  },
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
      display: false,
      type: 'linear',
      grid: { display: false },
      suggestedMax: 150,
      beginAtZero: true,
    },
    y: {grid: {display: false}}
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
