import ReactApexChart from "react-apexcharts";
import { useEffect, useState, useCallback } from "react";
import { Typography, Stack, CircularProgress } from "@mui/material";
import { ApexOptions } from "apexcharts";
import { useRepo } from "../../providers/context/covid.repository.contex";
import { getSection5ChartData } from "./apexOptions";
import { Select } from "../../components/Select";
import { COVID_YEARS } from "./options";

export default function Section5() {
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
    console.log("getData");
    setChartState(undefined);
    const data = await repository.getSouthAmericaStringencyIndex({
      startDate: `${currentYear}-01-01`,
      endDate: `${currentYear}-12-31`,
    });
    const optionSeries = getSection5ChartData(data, "Latin America stringency indexes");
    setChartState(optionSeries);
  }, [currentYear, repository]);

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
          Contingency measures in Latin America
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
