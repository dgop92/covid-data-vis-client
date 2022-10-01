import { ApexOptions } from "apexcharts";
import { CovidBasicSerie } from "../../services/repository/covid.repository.definition";
import {
  commonChartOptions,
  commonThemeOptions,
  commonTitleOptions,
} from "../../utils/commonApexOptions";
import { addDays, zipTwoArrs } from "../../utils/helpers";

const getChartOptions = (
  chartId: string,
  chartGroup: string,
  yMinWidth: number,
  minDateAsUnixTimeStamp: number | undefined,
  maxDateAsUnixTimeStamp: number | undefined,
  title?: string,
  gridBottomPadding?: number
): ApexOptions => ({
  chart: {
    ...commonChartOptions,
    zoom: {
      enabled: true,
    },
    toolbar: {
      show: true,
      offsetY: 15,
      tools: {
        download: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: true,
        reset: false,
      },
      autoSelected: "pan",
    },
    events: {
      beforeZoom: function (ctx: any) {
        // we need to clear the range as we only need it on the iniital load.
        ctx.w.config.xaxis.min = undefined;
        ctx.w.config.xaxis.max = undefined;
      },
    },
    id: chartId,
    group: chartGroup,
  },
  grid: {
    padding: {
      top: 20,
      right: 20,
      bottom: gridBottomPadding || 0,
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
    ...commonTitleOptions,
  },
  tooltip: {
    x: {
      format: "dd/MM/yy",
    },
  },
  xaxis: {
    type: "datetime",
    min: minDateAsUnixTimeStamp,
    max: maxDateAsUnixTimeStamp,
    labels: {
      format: "dd/MM/yy",
    },
  },
  yaxis: {
    labels: {
      minWidth: yMinWidth,
    },
  },
  theme: {
    ...commonThemeOptions,
  },
});

export const getSection1ChartData = (
  covidBasicSerie: CovidBasicSerie,
  title: string
) => {
  const { cases, deaths, dates } = covidBasicSerie;
  const datesAsUnixTimeStamp = dates.map((date) => date.getTime());

  // the response from the API is sorted by date, so we can use the first element
  // the response may contains 0 records
  const minDateAsUnixTimeStamp: number | undefined = datesAsUnixTimeStamp[0];
  const maxDateAsUnixTimeStamp: number | undefined = minDateAsUnixTimeStamp
    ? addDays(new Date(minDateAsUnixTimeStamp), 100).getTime()
    : undefined;

  const caseDatePairs = zipTwoArrs(datesAsUnixTimeStamp, cases);
  const deathDatePairs = zipTwoArrs(datesAsUnixTimeStamp, deaths);

  const series1 = [
    {
      name: "Positive cases",
      data: caseDatePairs,
      color: "#5DADE2",
    },
  ];
  const series2 = [
    {
      name: "Deaths",
      data: deathDatePairs,
      color: "#EC7063",
    },
  ];

  const options1 = getChartOptions(
    "positive-cases",
    "deaths-cases-chart",
    40,
    minDateAsUnixTimeStamp,
    maxDateAsUnixTimeStamp,
    title
  );
  const options2 = getChartOptions(
    "deaths",
    "deaths-cases-chart",
    40,
    minDateAsUnixTimeStamp,
    maxDateAsUnixTimeStamp,
    undefined,
    40
  );

  return { series1, series2, options1, options2 };
};
