import { ApexOptions } from "apexcharts";
import { CountryBasicInfo } from "../../services/repository/covid.repository.definition";
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
      width: "100%",
      background: "#2e2d2d",
      type: "bar",
      fontFamily: '"Quicksand", "Helvetica", "Arial", sans-serif',
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
    xaxis: {
      categories: top5Countries.map((country) =>
        getCountryNameByIsoCode(country.isoCode)
      ),
    },
    theme: {
      mode: "dark",
    },
  };
  return { options, series };
};
