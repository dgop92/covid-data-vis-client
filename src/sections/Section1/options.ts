import { ApexOptions } from "apexcharts";
import { MenuItemPair } from "../../components/Select";
import { addDays } from "../../utils/helpers";

export const getSectionChart1Options = (
  minDate: Date | null,
  title: string
): ApexOptions => ({
  chart: {
    width: "100%",
    background: "#2e2d2d",
    type: "area",
    fontFamily: '"Quicksand", "Helvetica", "Arial", sans-serif',
    zoom: {
      enabled: true,
    },
    toolbar: {
      show: true,
      tools: {
        download: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: true,
        reset: false,
      },
    },
    events: {
      beforeZoom: function (ctx) {
        // we need to clear the range as we only need it on the iniital load.
        ctx.w.config.xaxis.min = undefined;
        ctx.w.config.xaxis.max = undefined;
      },
    },
  },
  grid: {
    padding: {
      top: 20,
      right: 20,
      bottom: 40,
      left: 20,
    },
  },
  legend: {
    fontFamily: '"Quicksand", "Helvetica", "Arial", sans-serif',
    offsetY: -15,
    itemMargin: {
      horizontal: 10,
    },
  },
  title: {
    text: title,
    offsetY: 15,
    align: "center",
    style: {
      fontSize: "20px",
      fontFamily: '"Quicksand", "Helvetica", "Arial", sans-serif',
      color: "#fff",
    },
  },
  xaxis: {
    type: "datetime",
    min: minDate?.getTime(),
    max: minDate ? addDays(minDate, 100).getTime() : undefined,
    labels: {
      format: "dd/MM/yy",
    },
  },
  theme: {
    mode: "dark",
  },
});

export const COVID_SEMESTERS: MenuItemPair[] = [
  {
    text: "Before 2020",
    value: "before2020",
  },
  {
    text: "First half of 2020",
    value: "firstHalf2020",
  },
  {
    text: "Second half of 2020",
    value: "secondHalf2020",
  },
  {
    text: "First half of 2021",
    value: "firstHalf2021",
  },
  {
    text: "Second half of 2021",
    value: "secondHalf2021",
  },
  {
    text: "After 2021",
    value: "after2021",
  },
];
