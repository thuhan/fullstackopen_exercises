import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>

  )
}

const Part = (props) => (
  <p>{props.name} {props.exercises}</p>
)

const Content = (props) => {
  const parts = props.parts.map(part => <Part key={part.name} name={part.name} exercises={part.exercises} />)
  return (
    <div>
      {parts}
    </div>

  )
}

const Total = (props) => {
  let total = 0
  props.parts.forEach(part => total += part.exercises)
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
