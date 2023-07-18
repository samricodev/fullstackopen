/* eslint-disable react/prop-types */
export default function Boton({ handleClick, text}) {
  return(  
    <button type="button" onClick={handleClick}>{text}</button>
  )
}
