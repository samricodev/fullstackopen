/* eslint-disable react/prop-types */
import '../styles/message.css'

export default function Message ({ message, type }){
    if (message === null) {
        return null
    }
    
    return (
        <div className={type}>
        {message}
        </div>
    )
}