import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Typography, Stack, CircularProgress } from "@mui/material";
import { useEffect, useCallback, useState } from "react";
import { useTrackVisibility } from "react-intersection-observer-hook";
import { useRepo } from "../../providers/context/covid.repository.contex";
import { getSection4ChartData } from "./apexOptions";
import { Select } from "../../components/Select";
import { COVID_YEARS, POPULATION_OPTIONS } from "./options";

export default function Section3() {
  const [ref, { wasEverVisible }] = useTrackVisibility();
  const [minPop, setMinPop] = useState("50000000");
  const [currentYear, setCurrentYear] = useState("2020");
  const [chartState, setChartState] = useState<
    | {
        options: ApexOptions;
        series: ApexAxisChartSeries;
      }
    | undefined
  >(undefined);

  const { repository } = useRepo();

  const getData = useCallback(async () => {
    if (wasEverVisible) {
      console.log("getData");
      const data = await repository.getCountriesBasicInfo({
        startDate: `${currentYear}-01-01`,
        endDate: `${currentYear}-12-31`,
      });
      const optionSeries = getSection4ChartData(data, Number(minPop));
      setChartState(optionSeries);
    }
  }, [currentYear, minPop, repository, wasEverVisible]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Stack
      component="section"
      sx={{
        display: "flex",
      }}
      ref={ref}
    >
      <Stack>
        <Typography
          variant="h4"
          component="h4"
          sx={{
            p: 1,
          }}
        >
          4. What are the top 5 countries with fewer deaths?
        </Typography>
        <Stack
          sx={{ margin: "2rem auto" }}
          display="flex"
          height={400}
          width="100%"
          maxWidth={1200}
        >
          {chartState ? (
            <ReactApexChart
              options={chartState.options}
              series={chartState.series}
              height="100%"
              type="bar"
            />
          ) : (
            <CircularProgress sx={{ margin: "auto" }} />
          )}
        </Stack>
      </Stack>
      <Stack
        direction="row"
        gap={5}
        sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
        flexWrap="wrap"
      >
        <Select
          name="year"
          label="Year"
          items={COVID_YEARS}
          value={currentYear}
          onChange={(e) => setCurrentYear(e.target.value)}
        />
        <Select
          name="min-population"
          label="Minimum Population"
          items={POPULATION_OPTIONS}
          value={minPop}
          onChange={(e) => setMinPop(e.target.value)}
        />
      </Stack>
    </Stack>
  );
}
