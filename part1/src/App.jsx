import Boton from "./components/Boton"
import Statistics from "./components/Statistics"
import { useState } from "react"

function App() {
  const [ feedback, setFeedBack] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })

  const good = () => {
    const newFeedBack = {
      ...feedback,
      good: feedback.good + 1
      
    }
    setFeedBack(newFeedBack)
  }

  const neutral = () => {
    const newFeedBack = {
      ...feedback,
      neutral: feedback.neutral + 1,
    }
    setFeedBack(newFeedBack)
  }

  const bad = () => {
    const newFeedBack = {
      ...feedback,
      bad: feedback.bad +1
    }
    setFeedBack(newFeedBack)
  }

  const totalFeedBack = (feedback.good + feedback.neutral + feedback.bad) 

  const promedio = ((feedback.good * 1) + (feedback.neutral * 0 ) + (feedback.bad * -1)) / totalFeedBack

  const positivos = (feedback.good / totalFeedBack) * 100

  return (
    <div>
      <h2>Give FeedBack</h2>
      <Boton handleClick={good} text="good"/>
      <Boton handleClick={neutral} text="neutral"/>
      <Boton handleClick={bad} text="bad"/>
      <Statistics  feedback={feedback} positivos={positivos} promedio={promedio} totalFeedBack={totalFeedBack}/>
    </div>
  )
}

export default App
