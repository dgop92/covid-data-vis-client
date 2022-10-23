import { Typography, Stack, CircularProgress } from "@mui/material";
import { ApexOptions } from "apexcharts";
import { useEffect, useState, useCallback } from "react";
import ReactApexChart from "react-apexcharts";
import { CountrySelect } from "../../components/CountrySelect";
import { Country, DEFAULT_COUNTRY } from "../../utils/countries";
import { Select } from "../../components/Select";
import { useRepo } from "../../providers/context/covid.repository.contex";
import { getSection1ChartData } from "./apexOptions";
import { COVID_SEMESTERS } from "./options";

export default function Section1() {
  const [chartState, setChartState] = useState<
    | {
        options1: ApexOptions;
        series1: ApexAxisChartSeries;
        options2: ApexOptions;
        series2: ApexAxisChartSeries;
      }
    | undefined
  >(undefined);
  const [currentCountry, setCurrentCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [currentSemester, setCurrentSemester] = useState<string>(
    COVID_SEMESTERS[1].value as string
  );

  const { repository } = useRepo();

  const getData = useCallback(async () => {
    console.log("getData");
    setChartState(undefined);
    const data = await repository.getBasicSerieByCountry(
      currentCountry.isoCode,
      currentSemester
    );
    const optionSeries = getSection1ChartData(data, currentCountry.label);
    setChartState(optionSeries);
  }, [currentCountry, currentSemester, repository]);

  const onCountryChange = (country: Country) => {
    setCurrentCountry(country);
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Stack
      component="section"
      sx={{
        display: "flex",
      }}
    >
      <Stack>
        <Typography
          variant="h4"
          component="h4"
          sx={{
            p: 1,
          }}
        >
          1. Positive cases and deaths
        </Typography>
        <Typography
          variant="body1"
          sx={{
            p: 1,
          }}
        >
          We expect a positive correlation between the number of cases and deaths. This
          assumption is based on the mortality of this disease. Does this correlation
          hold in almost all countries?. We observe that in a lot of countries the
          relationship between the two variables is strong but is not applicable in all
          countries
        </Typography>
      </Stack>
      <Stack my={4} display="flex" height={700} width="100%">
        {chartState ? (
          <>
            <ReactApexChart
              options={chartState.options1}
              series={chartState.series1}
              height="50%"
            />
            <ReactApexChart
              options={chartState.options2}
              series={chartState.series2}
              height="50%"
            />
          </>
        ) : (
          <CircularProgress sx={{ margin: "auto" }} />
        )}
      </Stack>
      <Stack
        direction="row"
        gap={5}
        sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
        flexWrap="wrap"
      >
        <CountrySelect onCountryChange={onCountryChange} id="section1" />
        <Select
          name="period"
          label="Period"
          items={COVID_SEMESTERS}
          value={currentSemester}
          onChange={(e) => setCurrentSemester(e.target.value)}
        />
      </Stack>
    </Stack>
  );
}
