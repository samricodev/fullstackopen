/* eslint-disable react/prop-types */
import StatisticLine from "./StatisticLine"

export default function Statistics({ feedback, promedio, positivos, totalFeedBack }) {
  if (totalFeedBack != 0) {
    return (
      <>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <StatisticLine statisticName="Good" statisticValue={feedback.good}/>
            <StatisticLine statisticName="Neutral" statisticValue={feedback.neutral}/>
            <StatisticLine statisticName="Bad" statisticValue={feedback.bad}/>
            <StatisticLine statisticName="Average" statisticValue={promedio}/>
            <StatisticLine statisticName="Positives" statisticValue={positivos} statisticType="percent"/>
          </tbody>
        </table>
      </>
    )
  }

  return (
    <>
      <h2>Statistics</h2>
      <div>
        <p>No FeedBack given</p>
      </div>
    </>
  )
}