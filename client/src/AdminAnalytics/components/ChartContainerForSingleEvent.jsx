import React, { useState } from "react";

import BarChart from "./BarChartForSingleEvent";
import AreaChart from "./AreaChartForSingleEvent";
import ChartContainerWrapper from "../functionalcomponents/ChartContainer";

const ChartsContainerForSingleEvent = ({ data }) => {
  const [barChart, setBarChart] = useState(true);
  return (
    <ChartContainerWrapper>
      <h4>Time Vs Attendance</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </ChartContainerWrapper>
  );
};

export default ChartsContainerForSingleEvent;
