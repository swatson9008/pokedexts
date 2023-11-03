import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartDataLabels
);

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
        size: 16, 
      },
    },
  },
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  layout: {
    padding: {
      left: 20, 
      right: 20, 
    },
  },
  title: {
    display: true,
    text: "Base Stats",
    font: {
      size: 18, 
      weight: "bold",
    },
  },
  scales: {
    x: {
      display: false,
      type: "linear",
      grid: { display: false },
      suggestedMax: 150,
      beginAtZero: true,
    },
    y: {
      grid: { display: false },
      ticks: {
        color: "black",
        font: {
          size: 14, // Increase the font size of the Y-axis labels
        },
      },
    },
  },
};




export function baseStatBarChart(pokeStats: PokeStat[]) {
  const labels = [ 
    "HP",
    "Attack",
    "Defense",
    "Special Attack",
    "Special Defense",
    "Speed",
  ];

  const dataValues = pokeStats.map((stat: { base_stat: string }) =>
    parseInt(stat.base_stat)
  );

  const backgroundColor = dataValues.map((value) => {
    if (value < 35) {
      return "#b50b19";
    } else if (value >= 35 && value <= 50) {
      return "#b84d0b";
    } else if (value >= 51 && value <= 75) {
      return "#e6f169";
    } else if (value >= 76 && value <= 99) {
      return "#b0eb7c";
    } else if (value >= 100 && value <= 125) {
      return "#4ced51";
    } else if (value > 126) {
      return "#4cedbf";
    } else {
      return "rgba(255, 99, 132, 0.5)";
    }
  });

  const borderRadius = dataValues.map(() => 25);

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        borderColor: "none",
        backgroundColor,
        borderRadius,
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
