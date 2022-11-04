import { Chart, TooltipModel } from "chart.js";
// https://www.chartjs.org/docs/latest/configuration/tooltip.html#external-custom-tooltips
// modified from above
export const getOrCreateTooltip = (chart: Chart<"doughnut">) => {
  let tooltipEl;
  if (chart !== null) {
    tooltipEl = chart?.canvas?.parentNode?.querySelector("div");
  }

  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.style.background = "#111827";
    tooltipEl.style.borderRadius = "4px";
    tooltipEl.style.color = "white";
    tooltipEl.style.opacity = "1";
    tooltipEl.style.pointerEvents = "none";
    tooltipEl.style.position = "absolute";
    tooltipEl.style.transform = "translate(-50%, 0)";
    tooltipEl.style.transition = "all .1s ease";
    tooltipEl.style.fontFamily = "'Montserrat', sans-serif"; // closest font to Proxima nova

    const table = document.createElement("table");
    table.style.margin = "0px";
    tooltipEl.className = "externalTooltip";

    tooltipEl.appendChild(table);
    chart?.canvas?.parentNode?.appendChild(tooltipEl);
  }

  return tooltipEl;
};

export const externalTooltipHandlerWithUnit = (
  context: {
    chart: Chart<"doughnut">;
    tooltip: TooltipModel<"doughnut">;
  },
  unit: string
) => {
  // Tooltip Element
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = "0";
    return;
  }

  // Set Text
  if (tooltip.body) {
    const bodyLines = tooltip.body.map((b) => b.lines);

    const tooltipContainer = document.createElement("div");

    bodyLines.forEach((body, i) => {
      const colors = tooltip.labelColors[i];

      const colorLegendSpan = document.createElement("span");
      colorLegendSpan.style.background = colors.backgroundColor as string;
      colorLegendSpan.style.marginRight = "4px";
      colorLegendSpan.style.height = "10px";
      colorLegendSpan.style.width = "10px";
      colorLegendSpan.style.borderRadius = "10px";
      colorLegendSpan.style.display = "inline-block";

      const labelSpan = document.createElement("span");
      labelSpan.innerHTML = tooltip.dataPoints[0].label;
      labelSpan.style.color = "#9ca3af"; //gray-400
      labelSpan.style.marginRight = "12px";
      labelSpan.style.fontWeight = "600";
      labelSpan.style.lineHeight = "1rem";
      labelSpan.style.fontSize = ".75rem";
      labelSpan.style.fontFamily = "'Montserrat', sans-serif"; // close font to Proxima nova

      const valueSpan = document.createElement("span");
      valueSpan.innerHTML = tooltip.dataPoints[0].formattedValue + " " + unit;
      valueSpan.style.color = "white";
      valueSpan.style.fontWeight = "600";
      valueSpan.style.fontSize = ".75rem";
      valueSpan.style.lineHeight = "1rem";
      valueSpan.style.fontFamily = "'Montserrat', sans-serif"; // close font to Proxima nova

      const tr = document.createElement("tr");
      tr.style.backgroundColor = "inherit";
      tr.style.borderWidth = "0";

      const container = document.createElement("div");

      container.appendChild(colorLegendSpan);
      container.appendChild(labelSpan);
      container.appendChild(valueSpan);
      tr.appendChild(container);
      tooltipContainer.appendChild(tr);
    });

    const tableRoot = tooltipEl.querySelector("table");

    // // Remove old children
    while (tableRoot?.firstChild) {
      tableRoot?.firstChild.remove();
    }

    // // Add new children
    tableRoot?.appendChild(tooltipContainer);
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = "1";
  tooltipEl.style.left = positionX + tooltip.caretX + "px";
  tooltipEl.style.top = positionY + tooltip.caretY + "px";
  tooltipEl.style.font = "Helvetica, 'Helvetica Nue', Arial";
  tooltipEl.style.padding = "8px 16px";
};
