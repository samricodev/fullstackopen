/* eslint-disable react/prop-types */
export default function Total({ parts }) {

  const total = parts[0].exercises + parts[1].exercises + parts[2].exercises

  return (
    <p>Number of exercises {total}</p>
  )
}