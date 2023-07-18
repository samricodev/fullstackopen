/* eslint-disable react/prop-types */
import Header from './Header'
import Content from './Content'

export default function Course({ course }) {
    let total = 0

    course.parts.map(course => {
        total += course.exercises
    })

    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <p>Total of {total} exercises</p>
        </>
    )
}