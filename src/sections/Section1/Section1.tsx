import { Box, Typography, Stack } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import ReactApexChart from "react-apexcharts";
import { CountrySelect } from "../../components/CountrySelect";
import { Country, DEFAULT_COUNTRY } from "../../components/CountrySelect/countries";
import { Select } from "../../components/Select";
import { useRepo } from "../../providers/context/covid.repository.contex";
import { covidBasicSerieToApexChartSeries } from "../../services/transformers/repo-apexcharts";
import { COVID_SEMESTERS, getSectionChart1Options } from "./options";

function getMinDate(series: ApexAxisChartSeries) {
  if (series.length !== 0) {
    const firstSerieData = series[0].data as [number, number | null][];
    return new Date(firstSerieData[0][0]);
  }
  return null;
}

export default function Section1() {
  const [seriesState, setSeriesState] = useState<ApexAxisChartSeries>([]);
  const [currentCountry, setCurrentCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [currentSemester, setCurrentSemester] = useState<string>(
    COVID_SEMESTERS[1].value as string
  );

  const { repository } = useRepo();

  const getData = useCallback(async () => {
    console.log("getData");
    const data = await repository.getBasicSerieByCountry(
      currentCountry.isoCode,
      currentSemester
    );
    const series = covidBasicSerieToApexChartSeries(data);
    setSeriesState(series);
  }, [currentCountry.isoCode, currentSemester, repository]);

  const onCountryChange = (country: Country) => {
    setCurrentCountry(country);
  };

  useEffect(() => {
    getData();
  }, [getData]);

  const chartOptions = getSectionChart1Options(
    getMinDate(seriesState),
    currentCountry.label
  );

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
          1. Positive Cases, Deaths and recoverd
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
      <Box my={4}>
        <ReactApexChart options={chartOptions} series={seriesState} height={400} />
      </Box>
      <Stack direction="row" gap={5}>
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
