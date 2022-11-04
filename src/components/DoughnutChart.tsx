import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, TooltipModel } from "chart.js";
import { getChartColors, getHoverChartColors } from "./utils/chartUtils";
import { externalTooltipHandlerWithUnit } from "./utils/chartJsTooltipUtils";

export interface DoughnutChartProps {
  chartTitle: string;
  chartData: number[];
  chartLabels: string[];
  unit: string;
}

export const DoughnutChart: React.FC<DoughnutChartProps> = ({
  chartTitle,
  chartData,
  chartLabels,
  unit,
}: DoughnutChartProps) => {
  Chart.register(ArcElement, Tooltip);
  const isChartSingleValue = chartData.length < 2;
  const chartColors = getChartColors(chartData.length);
  const hoverColors = getHoverChartColors(chartData.length);
  const data = {
    labels: chartLabels,
    clip: { left: true, top: false, right: false, bottom: false },
    datasets: [
      {
        label: "Payload",
        data: chartData,
        backgroundColor: chartColors,
        hoverBorderColor: hoverColors,
        hoverBorderWidth: isChartSingleValue ? 2 : undefined,
        hoverOffset: isChartSingleValue ? 0 : 0,
        borderWidth: isChartSingleValue ? 0 : 2,
        borderRadius: isChartSingleValue ? 0 : 4,
        circular: true,
        spacing: isChartSingleValue ? 0 : 3,
      },
    ],
  };
  const options = {
    data: data,
    cutout: isChartSingleValue ? 68 : 64,
    plugins: {
      title: {
        display: false,
        text: chartTitle,
      },
      tooltip: {
        enabled: false,
        external: function (context: {
          chart: Chart<"doughnut">;
          tooltip: TooltipModel<"doughnut">;
        }) {
          externalTooltipHandlerWithUnit(context, unit);
        },
      },
    },
  };

  return <Doughnut aria-label={chartTitle} data={data} options={options} />;
};

export default DoughnutChart;
