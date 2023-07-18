
// eslint-disable-next-line react/prop-types
export default function StatisticLine({ statisticName, statisticValue, statisticType }) {
  if (statisticType === "percent") {
    return (
      <tr><td>{statisticName}:</td><td>{statisticValue}%</td></tr>
    )
  }

  return (
    <tr><td>{statisticName}:</td><td>{statisticValue}</td></tr>
  )
}