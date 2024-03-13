import StatsItemWrapper from "../functionalcomponents/StatsItem";

const StatItem = ({ count, title, icon, color, bcg }) => {
  return (
    <StatsItemWrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </StatsItemWrapper>
  );
};

export default StatItem;
