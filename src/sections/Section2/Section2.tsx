import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Typography, Stack, CircularProgress } from "@mui/material";
import { useEffect, useCallback, useState } from "react";
import { useRepo } from "../../providers/context/covid.repository.contex";
import { getSection2ChartData } from "./apexOptions";

export default function Section2() {
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
    const data = await repository.getCountriesBasicInfo();
    const optionSeries = getSection2ChartData(data, "Total Cases Vs Population");
    setChartState(optionSeries);
  }, [repository]);

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
          Is there a positive correlation between population density and the number of
          cases during 2020?
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
        <Stack sx={{ margin: "2rem auto" }} display="flex" height={400} width="75%">
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
