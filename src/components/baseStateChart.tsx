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

export const options: any = (isDarkMode: boolean) => ({
  plugins: {
    labels: {
      fontColor: '#fff',

},
    datalabels: {
      display: true,
      color: isDarkMode ? "white" : "black",
      anchor: "end",
      align: "right",
      font: {
        size: 16,
        Family: "Barlow",
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
      left: 0,
      right: 60,
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
        color: isDarkMode ? "white" : "black",
        font: {
          size: 16,
          weight: "bold",
          family: "barlow",
        },
      },
    },
  },
});

export function baseStatBarChart(pokeStats: PokeStat[], isDarkMode: boolean) {
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
    if (value < 35 && isDarkMode === false) {
      return "#b50b19";
    } else if (value < 35 && isDarkMode === true) {
      return "#750a13";
    } else if (value >= 35 && value <= 50 && isDarkMode === false) {
      return "#b84d0b";
    } else if (value >= 35 && value <= 50 && isDarkMode === true) {
      return "#863c0d";
    } else if (value >= 51 && value <= 75 && isDarkMode === false) {
      return "#e6f169";
    } else if (value >= 51 && value <= 75 && isDarkMode === true) {
      return "#aab350";
    } else if (value >= 76 && value <= 99 && isDarkMode === false) {
      return "#b0eb7c";
    } else if (value >= 76 && value <= 99 && isDarkMode === true) {
      return "#84b15e";
    } else if (value >= 100 && value <= 126 && isDarkMode === false) {
      return "#4ced51";
    } else if (value >= 100 && value <= 126 && isDarkMode === true) {
      return "#35a539";
    } else if (value > 126 && isDarkMode === false) {
      return "#4cedbf";
    } else if (value > 126 && isDarkMode === true) {
      return "#309478";
    } else {
      return "rgba(255, 255, 255, 0.5)";
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

  return <Bar options={options(isDarkMode)} data={data} />;
}
