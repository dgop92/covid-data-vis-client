import { AxiosInstance } from "axios";
import { CamelCaseToSnakeCaseNested } from "../../utils/types";
import {
  CountryBasicInfo,
  CountryBasicInfoOptions,
  CovidBasicSerie,
  ICovidRepository,
} from "./covid.repository.definition";

function getStartAndEndDate(covidSemester: string): {
  startDate?: string;
  endDate?: string;
} {
  switch (covidSemester) {
    case "beforeFirstHalf2020":
      return {
        endDate: "2020-06-30",
      };
    case "secondHalf2020":
      return {
        startDate: "2020-07-01",
        endDate: "2020-12-31",
      };
    case "firstHalf2021":
      return {
        startDate: "2021-01-01",
        endDate: "2021-06-30",
      };
    case "afterSecondHalf2021":
      return {
        startDate: "2021-07-01",
        endDate: "2021-12-31",
      };
    case "year2020":
      return {
        startDate: "2020-01-01",
        endDate: "2020-12-31",
      };
    case "year2021":
      return {
        startDate: "2021-01-01",
        endDate: "2021-12-31",
      };
    default:
      return {};
  }
}

export class CovidRepository implements ICovidRepository {
  constructor(private readonly client: AxiosInstance) {}

  async getBasicSerieByCountry(
    isoCode: string,
    semester?: string | undefined
  ): Promise<CovidBasicSerie> {
    const startEndDate = getStartAndEndDate(semester || "beforeFirstHalf2020");
    const urlSearchParams = new URLSearchParams();
    if (startEndDate.startDate) {
      urlSearchParams.set("start", startEndDate.startDate);
    }
    if (startEndDate.endDate) {
      urlSearchParams.set("end", startEndDate.endDate);
    }
    const queryString = urlSearchParams.toString();
    const response = await this.client.get<
      { date: string; new_cases: number; new_deaths: number }[]
    >(`/covid-records/${isoCode}?${queryString}`);

    return {
      dates: response.data.map((item) => new Date(item.date)),
      cases: response.data.map((item) => item.new_cases),
      deaths: response.data.map((item) => item.new_deaths),
    };
  }

  async getCountriesBasicInfo(
    options?: CountryBasicInfoOptions
  ): Promise<CountryBasicInfo[]> {
    const urlSearchParams = new URLSearchParams();
    if (options?.startDate) {
      urlSearchParams.set("start", options.startDate);
    }
    if (options?.endDate) {
      urlSearchParams.set("end", options.endDate);
    }
    const queryString = urlSearchParams.toString();

    const response = await this.client.get<
      CamelCaseToSnakeCaseNested<CountryBasicInfo>[]
    >(`/countries-basic-info?${queryString}`);

    return response.data.map((item) => ({
      isoCode: item.iso_code,
      continent: item.continent,
      totalCases: item.total_cases,
      totalDeaths: item.total_deaths,
      populationDensity: item.population_density,
      population: item.population,
      gdpPerCapita: item.gdp_per_capita,
      lifeExpectancy: item.life_expectancy,
      humanDevelopmentIndex: item.human_development_index,
    }));
  }
}
