import { Typography, Stack } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import ReactApexChart from "react-apexcharts";
import { useRepo } from "../../services/context/covid.repository.contex";
import { zipTwoArrs } from "../../utils/helpers";
import { sectionChart1Options } from "./chart.options";

export default function Section1() {
  const [seriesState, setSeriesState] = useState<[number, number][]>([]);
  const { repository } = useRepo();

  const getData = useCallback(async () => {
    console.log("getData");
    const data = await repository.getBasicSerieByCountry("COL");
    const { cases, dates } = data;
    const datesAsUnixTimeStamp = dates.map((date) => new Date(date).getTime());
    const series = zipTwoArrs(datesAsUnixTimeStamp, cases);
    setSeriesState(series);
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
          1. Positive Cases, Deaths and recoverd
        </Typography>
        <Typography
          variant="body1"
          sx={{
            p: 1,
            mb: 4,
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit illum totam
          numquam. Tempore iusto excepturi deleniti a dolore repudiandae illo nesciunt,
          aperiam dolorum cupiditate corrupti accusamus dignissimos, nihil ipsum ab odio
          similique explicabo? Quo quaerat error eum vitae repudiandae, sequi hic? Iure
          autem reiciendis officia molestias excepturi rem natus quidem?
        </Typography>
      </Stack>
      <ReactApexChart
        options={sectionChart1Options}
        series={[{ name: "cases", data: seriesState }]}
        height={350}
      />
    </Stack>
  );
}
