import { ApexOptions } from "apexcharts";

export const sectionChart1Options: ApexOptions = {
  chart: {
    width: "100%",
    type: "area",
    fontFamily: '"Quicksand", "Helvetica", "Arial", sans-serif',
    zoom: {
      type: "x",
      enabled: true,
      autoScaleYaxis: true,
    },
    events: {
      beforeZoom: function (ctx) {
        // we need to clear the range as we only need it on the iniital load.
        ctx.w.config.xaxis.range = undefined;
      },
    },
  },
  xaxis: {
    type: "datetime",
    range: new Date(2021, 6, 0).getTime() - new Date(2021, 0, 0).getTime(),
  },
  theme: {
    mode: "dark",
  },
};
