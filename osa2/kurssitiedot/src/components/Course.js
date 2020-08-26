import React from 'react'

const Header = (props) => (
    <div>
        <h1>{props.course}</h1>
    </div>
)

const Part = (props) => (
    <p>{props.part} {props.exercises} </p>
)

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((part) => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
        </div>
    )
}

const Total = ({ parts }) => {
    let total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <div>
            <strong>Number of exercises {total}</strong>
        </div>
    )

}
const Course = ({ course }) => (
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
)

export default Course;