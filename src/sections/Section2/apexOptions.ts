import { ApexOptions } from "apexcharts";
import { CountryBasicInfo } from "../../services/repository/covid.repository.definition";

export const getSection2ChartData = (
  countriesBasicInfo: CountryBasicInfo[],
  title: string
) => {
  const seriesData: Array<[number, number]> = countriesBasicInfo.map((country) => [
    country.totalCases,
    country.populationDensity,
  ]);

  const series = [
    {
      data: seriesData,
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
        show: false,
        offsetY: 15,
        tools: {
          download: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
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
      offsetY: 15,
      align: "center",
      style: {
        fontSize: "20px",
        fontFamily: '"Quicksand", "Helvetica", "Arial", sans-serif',
        color: "#fff",
      },
    },
    xaxis: {
      tickAmount: 20,
      type: "numeric",
      labels: {
        formatter: (value: string) =>
          Intl.NumberFormat("en", { notation: "compact" }).format(Number(value)),
      },
    },
    theme: {
      mode: "dark",
    },
  };
  return { options, series };
};
