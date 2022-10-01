import { ApexOptions } from "apexcharts";
import { CountryBasicInfo } from "../../services/repository/covid.repository.definition";
import {
  commonChartOptions,
  commonThemeOptions,
  commonTitleOptions,
} from "../../utils/commonApexOptions";

export const getSection2ChartData = (
  countriesBasicInfo: CountryBasicInfo[],
  title: string
) => {
  const seriesData: Array<[number, number] | null> = countriesBasicInfo.map(
    (country) => {
      if (country.populationDensity && country.totalCases) {
        return [country.populationDensity, country.totalCases];
      }
      return null;
    }
  );
  const seriesDataNoNulls = seriesData.filter(
    (item): item is [number, number] => item !== null
  );

  const series = [
    {
      data: seriesDataNoNulls,
    },
  ];

  const options: ApexOptions = {
    chart: {
      ...commonChartOptions,
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
    title: {
      text: title,
      ...commonTitleOptions,
    },
    xaxis: {
      tickAmount: 20,
      type: "numeric",
      labels: {
        formatter: (value: string) =>
          Intl.NumberFormat("en", { notation: "compact" }).format(Number(value)),
      },
    },
    tooltip: {
      enabled: false,
    },
    theme: {
      ...commonThemeOptions,
    },
    responsive: [
      {
        breakpoint: 900,
        options: {
          xaxis: {
            tickAmount: 10,
          },
        },
      },
      {
        breakpoint: 500,
        options: {
          xaxis: {
            tickAmount: 6,
          },
        },
      },
    ],
  };
  return { options, series };
};
