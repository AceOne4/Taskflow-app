// src/utils/chartjs.ts
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);
