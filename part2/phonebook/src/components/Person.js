import React from 'react'

const Person = ({name, number, handleDelete, id}) => (
  <p>{name} {number} <button onClick={handleDelete}>Delete</button></p>
)

export default Person