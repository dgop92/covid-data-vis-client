import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Typography, Stack, CircularProgress } from "@mui/material";
import { useEffect, useCallback, useState } from "react";
import { useTrackVisibility } from "react-intersection-observer-hook";
import { useRepo } from "../../providers/context/covid.repository.contex";
import { getSection2ChartData } from "./apexOptions";

export default function Section2() {
  const [ref, { wasEverVisible }] = useTrackVisibility();

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
      const data = await repository.getCountriesBasicInfo();
      const optionSeries = getSection2ChartData(data, "Total Cases Vs Population");
      setChartState(optionSeries);
    }
  }, [repository, wasEverVisible]);

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
          2. Is there a positive correlation between population and the number of cases
          during 2020?
        </Typography>
        <Typography
          variant="body1"
          sx={{
            p: 1,
          }}
        >
          Countries that have a higher population are supposed to have higher COVID
          cases. This is something trivial, more people mean more probability of getting
          infected. In the scatterplot, we observe that there is no strong relationship
          between the population and the number of cases because some countries with
          lower populations have more cases than some countries with higher populations.
        </Typography>
        <Stack
          sx={{ margin: "2rem auto" }}
          display="flex"
          height={400}
          width="100%"
          maxWidth={1300}
        >
          {chartState ? (
            <ReactApexChart
              options={chartState.options}
              series={chartState.series}
              height="100%"
              type="scatter"
            />
          ) : (
            <CircularProgress sx={{ margin: "auto" }} />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
