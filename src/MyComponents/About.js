import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'

const About = () => {
  const a = useContext(NoteContext);
  return (
    <div className='container'><h2 className='my-5'>My name is {a.state.name}. My favourite programming language is {a.state.lang}. This is a todo app, you can add your todos here.</h2></div>
  )
}

export default About