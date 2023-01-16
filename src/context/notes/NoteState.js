import React from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const title = "My Todo App";
    const state ={
        "name":"Yeeshu Pushparag",
        "lang":"Java"
    }
  return (
 <NoteContext.Provider value={{state,title}}>
    {props.children}
 </NoteContext.Provider>
  )
}

export default NoteState;  
