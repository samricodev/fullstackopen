/* eslint-disable react/prop-types */
import Part from './Part'

// eslint-disable-next-line react/prop-types
export default function Content({ parts }) {

  return (
    <>
      {parts.map( part =>{
        return(
          <Part key={part.id} part={part.name} exercises={part.exercises}/>
        )
      })}
    </>
  )
}