import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const CurrentAnecdote = ({ anecdotes, selected, points }) => (
  <div>
    <h1>Anecdote of the day</h1>
    <p>{anecdotes[selected]}</p>
    <p>has {points[selected]} votes</p>
  </div>
)

const MostVotedAnecdote = ({ anecdotes, points }) => {
  const maxPoint = Math.max(...points)
  if (maxPoint > 0) {
    const indexOfTopAnecdote = points.findIndex(point => point === maxPoint)
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[indexOfTopAnecdote]}</p>
        <p>has {maxPoint} votes  </p>
      </div>
    )
  }

  return (
    <div>
      <p>No anecdote has been voted</p>
    </div>
  )
}

const App = (props) => {
  const initial_points = new Array(props.anecdotes.length).fill(0)

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(initial_points)

  const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  }

  const voteHandler = () => {
    const updated_points = [...points]
    updated_points[selected] += 1
    setPoints(updated_points)
  }

  return (
    <div>
      <CurrentAnecdote anecdotes={props.anecdotes} selected={selected} points={points} />
      <Button onClick={voteHandler} text='vote' />
      <Button onClick={() => setSelected(getRandomInt(0, props.anecdotes.length))} text='next anecdote' />
      <MostVotedAnecdote anecdotes={props.anecdotes} points={points} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>,
  document.getElementById('root')
);
