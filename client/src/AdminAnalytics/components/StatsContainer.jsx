import StatItem from "./StatItem";
import StatsContainerWrapper from "../functionalcomponents/StatsContainer";

const StatsContainer = ({ defaultStats }) => {
  return (
    <StatsContainerWrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </StatsContainerWrapper>
  );
};

export default StatsContainer;
