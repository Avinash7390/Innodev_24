import React, { useState } from "react";

import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import ChartContainerWrapper from "../functionalcomponents/ChartContainer";

const ChartsContainerForAllEvents = ({ data }) => {
  const [barChart, setBarChart] = useState(true);
  return (
    <ChartContainerWrapper>
      <h4>Tickets Sold</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </ChartContainerWrapper>
  );
};

export default ChartsContainerForAllEvents;
