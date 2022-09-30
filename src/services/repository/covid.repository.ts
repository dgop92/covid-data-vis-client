import { AxiosInstance } from "axios";
import { CamelCaseToSnakeCaseNested } from "../../utils/types";
import {
  CountryBasicInfo,
  CovidBasicSerie,
  ICovidRepository,
} from "./covid.repository.definition";

function getStartAndEndDate(covidSemester: string): {
  startDate?: string;
  endDate?: string;
} {
  switch (covidSemester) {
    case "before2020":
      return {
        endDate: "2019-12-31",
      };
    case "firstHalf2020":
      return {
        startDate: "2020-01-01",
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
    case "secondHalf2021":
      return {
        startDate: "2021-07-01",
        endDate: "2021-12-31",
      };
    case "after2021":
      return {
        startDate: "2022-01-01",
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
    const startEndDate = getStartAndEndDate(semester || "firstHalf2020");
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

  async getCountriesBasicInfo(): Promise<CountryBasicInfo[]> {
    const response = await this.client.get<
      CamelCaseToSnakeCaseNested<CountryBasicInfo>[]
    >("/total-cases-population?remove_outliers=True");
    return response.data.map((item) => ({
      isoCode: item.iso_code,
      totalCases: item.total_cases,
      populationDensity: item.population_density,
      population: item.population,
    }));
  }
}
