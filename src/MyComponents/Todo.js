import React from 'react'
import { TodoItem } from './TodoItem'

export const Todo = (props) => {
  return (
    <>
    <div className="container">
    <h3 className="text-center my-3"> Todos List : </h3>
    {props.todos.map((todo)=>{
        return <TodoItem todo={todo} key={todo._id}onDelete={props.onDelete} onUpdate={props.onUpdate}/>
    })}
    
    </div>
    </>
  )
}
