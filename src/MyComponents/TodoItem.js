import React from 'react'

export const TodoItem = ({todo,onDelete,onUpdate}) => {
  const url = `http://localhost:4000/public/images/${todo.image}`;
  return (
    <div className="container">
        <h4>{todo.title}</h4>
        <p>{todo.description}</p>
        <img src={`${url}`} alt={`${todo.image}`} width="100" height="100"/>
        <button className="btn btn-sm btn-danger mx-1" onClick={()=>{onDelete(todo)}}>
            Delete</button>
        <button className="btn btn-sm btn-danger mx-1" onClick={()=>{onUpdate(todo)}}>
            Update</button>
        </div>
  )
}
