import { zipTwoArrs } from "../../utils/helpers";
import { CovidBasicSerie } from "../repository/covid.repository.definition";

export function covidBasicSerieToApexChartSeries(
  covidBasicSerie: CovidBasicSerie
): ApexAxisChartSeries {
  const { cases, deaths, dates } = covidBasicSerie;
  const datesAsUnixTimeStamp = dates.map((date) => new Date(date).getTime());

  const caseDatePairs = zipTwoArrs(datesAsUnixTimeStamp, cases);
  const deathDatePairs = zipTwoArrs(datesAsUnixTimeStamp, deaths);

  return [
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
}
