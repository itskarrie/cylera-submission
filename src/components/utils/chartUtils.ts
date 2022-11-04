import colors from "tailwindcss/colors";
import { DefaultColors } from "tailwindcss/types/generated/colors";

export interface Color {
  hue: string;
  shade: number;
}

export const getAllChartHueShadePairs = (): Color[] => {
  const colors = [
    { hue: "red", shade: 700 },
    { hue: "purple", shade: 700 },
    { hue: "teal", shade: 500 },
    { hue: "orange", shade: 500 },
    { hue: "blue", shade: 500 },
    { hue: "red", shade: 500 },
    { hue: "purple", shade: 500 },
    { hue: "teal", shade: 300 },
    { hue: "orange", shade: 300 },
    { hue: "blue", shade: 300 },
  ];
  return colors;
};

export const getTailwindClassNames = (): string[] => {
  const legendColors = getAllChartHueShadePairs();

  const cssNames = legendColors.map((legendColor) => {
    return `bg-${legendColor.hue}-${legendColor.shade}`;
  });
  return cssNames;
};

// ask designer what color/label limit should be
export const getChartColors = (colorCount: number) => {
  const availableColors = [
    colors.red[700],
    colors.purple[700],
    colors.teal[500],
    colors.orange[500],
    colors.blue[500],
    colors.red[500],
    colors.purple[500],
    colors.teal[300],
    colors.orange[300],
    colors.blue[300],
  ];

  // Note: normally the following would be a TODO
  // NICE TO HAVE: consistency with getAllChartHueShadePairs
  // const chartColors = getAllChartHueShadePairs();
  // const availableColors = chartColors.map((chartColors: Color) => {
  //   const hue = colors[chartColors.hue as keyof DefaultColors];
  //   return hue[chartColors.shade];
  // });

  return colorCount > availableColors.length
    ? availableColors
    : availableColors.slice(0, colorCount);
};

// NICE TO HAVE: some way to make sure the colors are consistent with the regular chart colors
export const getHoverChartColors = (colorCount: number) => {
  const availableColors = [
    colors.red[100],
    colors.purple[100],
    colors.teal[100],
    colors.orange[100],
    colors.blue[100],
  ];
  return colorCount > availableColors.length
    ? availableColors
    : availableColors.slice(0, colorCount);
};
