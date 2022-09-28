import { ApexOptions } from "apexcharts";
import { CovidBasicSerie } from "../../services/repository/covid.repository.definition";
import { addDays, zipTwoArrs } from "../../utils/helpers";

export const getSection1ChartData = (
  covidBasicSerie: CovidBasicSerie,
  title: string
) => {
  const { cases, deaths, dates } = covidBasicSerie;
  const datesAsUnixTimeStamp = dates.map((date) => date.getTime());

  // the response from the API is sorted by date, so we can use the first element
  // the response may contains 0 records
  const minDateAsUnixTimeStamp = datesAsUnixTimeStamp[0];
  const maxDateAsUnixTimeStamp = minDateAsUnixTimeStamp
    ? addDays(new Date(minDateAsUnixTimeStamp), 100).getTime()
    : undefined;

  const caseDatePairs = zipTwoArrs(datesAsUnixTimeStamp, cases);
  const deathDatePairs = zipTwoArrs(datesAsUnixTimeStamp, deaths);

  const series = [
    {
      name: "Positive cases",
      data: caseDatePairs,
      color: "#5DADE2",
    },
    {
      name: "Deaths",
      data: deathDatePairs,
      color: "#EC7063",
    },
  ];

  const options: ApexOptions = {
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
      min: minDateAsUnixTimeStamp,
      max: maxDateAsUnixTimeStamp,
      labels: {
        format: "dd/MM/yy",
      },
    },
    /* yaxis: {
      min: 0,
      max: Math.max(...cases) + 500,
    }, */
    theme: {
      mode: "dark",
    },
  };

  return { options, series };
};
