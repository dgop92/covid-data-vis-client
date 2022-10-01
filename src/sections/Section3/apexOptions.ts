import { ApexOptions } from "apexcharts";
import { CountryBasicInfo } from "../../services/repository/covid.repository.definition";
import { commonChartOptions, commonThemeOptions } from "../../utils/commonApexOptions";
import { getCountryNameByIsoCode } from "../../utils/countries";

export const getSection3ChartData = (countriesBasicInfo: CountryBasicInfo[]) => {
  const sortedCountriesBasicInfo = countriesBasicInfo.sort(
    (a, b) => b.totalDeaths - a.totalDeaths
  );
  const top5Countries = sortedCountriesBasicInfo.slice(0, 5);

  const series = [
    {
      name: "Total Deaths",
      data: top5Countries.map((country) => country.totalDeaths),
    },
  ];

  const options: ApexOptions = {
    chart: {
      ...commonChartOptions,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      padding: {
        top: 20,
        right: 20,
        bottom: 40,
        left: 20,
      },
    },
    xaxis: {
      categories: top5Countries.map((country) =>
        getCountryNameByIsoCode(country.isoCode)
      ),
    },
    theme: {
      ...commonThemeOptions,
    },
  };
  return { options, series };
};
