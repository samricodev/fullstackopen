/* eslint-disable react/prop-types */
import Part from './Part'

// eslint-disable-next-line react/prop-types
export default function Content({ parts }) {
  const part1 = parts[0].name
  const exercises1 = parts[0].exercises
  const part2 = parts[1].name
  const exercises2 = parts[1].exercises
  const part3 = parts[2].name
  const exercises3 = parts[2].exercises

  return (
    <>
      <Part part={part1} exercises={exercises1} />
      <Part part={part2} exercises={exercises2} />
      <Part part={part3} exercises={exercises3} />
    </>
  )
}