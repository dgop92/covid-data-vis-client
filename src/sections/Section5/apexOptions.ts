import { ApexOptions } from "apexcharts";
import { CountryStringencyIndex } from "../../services/repository/covid.repository.definition";
import {
  commonChartOptions,
  commonThemeOptions,
  commonTitleOptions,
} from "../../utils/commonApexOptions";
import { addDays, zipTwoArrs } from "../../utils/helpers";

const seriesColors = [
  "#B24747",
  "#B28847",
  "#9DB247",
  "#5DB247",
  "#47B272",
  "#47B2B2",
  "#4772B2",
  "#5D47B2",
  "#9D47B2",
  "#B24788",
];

export const getSection5ChartData = (
  countryStringencyIndexes: CountryStringencyIndex[],
  title: string
) => {
  let minDateAsUnixTimeStamp: number | undefined;

  const series = countryStringencyIndexes.map((country, index) => {
    const { isoCode, stringencyIndexes, dates } = country;
    const datesAsUnixTimeStamp = dates.map((date) => date.getTime());
    // the response from the API is sorted by date, so we can use the first element
    // the response may contains 0 records
    const dateAsUnixTimeStamp: number | undefined = datesAsUnixTimeStamp[0];
    if (
      minDateAsUnixTimeStamp === undefined ||
      dateAsUnixTimeStamp < minDateAsUnixTimeStamp
    ) {
      minDateAsUnixTimeStamp = dateAsUnixTimeStamp;
    }
    const indexesDatePairs = zipTwoArrs(datesAsUnixTimeStamp, stringencyIndexes);

    return {
      name: isoCode,
      data: indexesDatePairs,
      color: seriesColors[index % seriesColors.length],
    };
  });

  const maxDateAsUnixTimeStamp: number | undefined = minDateAsUnixTimeStamp
    ? addDays(new Date(minDateAsUnixTimeStamp), 100).getTime()
    : undefined;

  const options: ApexOptions = {
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
    theme: {
      ...commonThemeOptions,
    },
  };

  return { series, options };
};
