import { ApexOptions } from "apexcharts";

export const commonChartOptions: ApexOptions["chart"] = {
  width: "100%",
  background: "#2e2d2d",
  fontFamily: '"Quicksand", "Helvetica", "Arial", sans-serif',
};

export const commonTitleOptions: ApexOptions["title"] = {
  offsetY: 15,
  align: "center",
  style: {
    fontSize: "20px",
    fontFamily: '"Quicksand", "Helvetica", "Arial", sans-serif',
    color: "#fff",
  },
};

export const commonThemeOptions: ApexOptions["theme"] = {
  mode: "dark",
};
