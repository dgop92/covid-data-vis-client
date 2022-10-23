import ReactApexChart from "react-apexcharts";
import { useEffect, useState, useCallback } from "react";
import { Typography, Stack, CircularProgress } from "@mui/material";
import { ApexOptions } from "apexcharts";
import { useTrackVisibility } from "react-intersection-observer-hook";
import { useRepo } from "../../providers/context/covid.repository.contex";
import { getSection5ChartData } from "./apexOptions";
import { Select } from "../../components/Select";
import { COVID_YEARS } from "./options";

export default function Section5() {
  const [ref, { wasEverVisible }] = useTrackVisibility();
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
      setChartState(undefined);
      const data = await repository.getSouthAmericaStringencyIndex({
        startDate: `${currentYear}-01-01`,
        endDate: `${currentYear}-12-31`,
      });
      const optionSeries = getSection5ChartData(
        data,
        "Latin America stringency indexes"
      );
      setChartState(optionSeries);
    }
  }, [currentYear, repository, wasEverVisible]);

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
          5. How Latin American countries handle contingency measures?
        </Typography>
        <Typography
          variant="body1"
          sx={{
            p: 1,
          }}
        >
          In 2020 Argentina was the first one to implement contingency measures to
          control covid in the other hand Uruguay was the one with the lowest
          contingency measures. The next year the status changed, and Venezuela was the
          country with the strictest measures and Bolivia with the lowest. In general,
          Latin American countries have different contingency measures according to the
          cases of COVID.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            p: 1,
          }}
        >
          The stringency index is a composite measure based on nine response indicators
          including school closures, workplace closures, and travel bans, rescaled to a
          value from 0 to 100 (100 = strictest).
        </Typography>
        <Typography
          variant="body1"
          sx={{
            p: 1,
          }}
        >
          Note: Hover over the legend of a country to highlight the series. Click it to
          disable/enable the series in the chart
        </Typography>
      </Stack>
      <Stack my={4} display="flex" height={700} width="100%">
        {chartState ? (
          <ReactApexChart
            options={chartState.options}
            series={chartState.series}
            height="100%"
          />
        ) : (
          <CircularProgress sx={{ margin: "auto" }} />
        )}
      </Stack>
      <Stack
        direction="row"
        gap={5}
        sx={{ justifyContent: { xs: "center", sm: "flex-start" } }}
        flexWrap="wrap"
      >
        <Select
          name="year"
          label="Year"
          items={COVID_YEARS}
          value={currentYear}
          onChange={(e) => setCurrentYear(e.target.value)}
        />
      </Stack>
    </Stack>
  );
}
