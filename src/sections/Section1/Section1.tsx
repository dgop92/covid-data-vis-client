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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit illum totam
          numquam. Tempore iusto excepturi deleniti a dolore repudiandae illo nesciunt,
          aperiam dolorum cupiditate corrupti accusamus dignissimos, nihil ipsum ab odio
          similique explicabo? Quo quaerat error eum vitae repudiandae, sequi hic? Iure
          autem reiciendis officia molestias excepturi rem natus quidem?
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
      <Stack direction="row" gap={5} justifyContent="center" flexWrap="wrap">
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
