import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ onClick, text }) => (
  <button onClick={onClick}> {text} </button>
)

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ feedbacks: { good, neutral, bad } }) => {
  const total = good + neutral + bad
  if (total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text='good' value={good} />
          <Statistic text='neutral' value={neutral} />
          <Statistic text='bad' value={bad} />
          <Statistic text='all' value={total} />
          <Statistic text='average' value={(good * 1 + neutral * 0 + bad * -1) / total} />
          <Statistic text='positive' value={100 * good / total + ' %'} />
        </tbody>

      </table>
    </div>
  )
}

const App = () => {
  const [feedbacks, setFeedbacks] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })

  const increaseFeedbackCount = (feedbackType) => () =>
    setFeedbacks({ ...feedbacks, [feedbackType]: feedbacks[feedbackType] + 1 })

  return (
    <>
      <h1>give feedback</h1>
      <Button
        onClick={increaseFeedbackCount('good')}
        text='good' />
      <Button
        onClick={increaseFeedbackCount('neutral')}
        text='neutral' />
      <Button
        onClick={increaseFeedbackCount('bad')}
        text='bad' />
      <Statistics feedbacks={feedbacks} />
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
