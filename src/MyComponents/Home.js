import React, { useEffect ,useRef} from 'react'
import { Todo } from './Todo';
import { AddTodo } from './AddTodo'
import { useState } from "react";
import axios from "axios";

const Home = () => {
  const ref = useRef(null);
  var newTodo = {};
  const token = localStorage.getItem('token')
  const [notes, setNotes] = useState([]);
  const [fetch, setFetch] = useState(false);
  const [etitle, setEtitle] = useState("");
  const [edesc, setEdesc] = useState("");
  const [edp, setEDp] = useState("");
  const [cdp, setCDp] = useState("");
  const [todoId, setId] = useState();

  useEffect(() => {
    getAllNotes();
  },[fetch]);
  
 

    const getAllNotes = ()=>{
      const config = {
        headers:{
          "auth-token": token
        }
      };
     
      async function fetchnotes(){
        try {
          const notes = await axios.get("http://localhost:4000/api/notes/fetchallnotes",config)
          setNotes(notes.data)
        } catch (error) {
          console.log(error)
        }
      }
     
      fetchnotes();
    }
  
  
  const addTodo = (title, desc,dp) => {    
    const myTodo = {
      title: title,
      description: desc,
      image:dp.name,
    }
    const formdata = new FormData();
    formdata.append("myfile",dp);
    const config = {
      headers:{
        "auth-token": token,
        "Content-Type": "application/json"
      }
    }
    async function upload(){
      try {
        await axios.post("http://localhost:4000/api/notes/upload",formdata).then(postNote())
      } catch (error) {
        console.log(error)
      }
    }
      async function postNote(){
        try {
         const addData = await axios.post("http://localhost:4000/api/notes/addnote",myTodo,config)
          const success = addData.data.success;
          if (success) {
          setFetch(!fetch)
          }
        } catch (error) {
          console.log(error)
        }
      }
     
      upload();
  }
  const onDelete=(todo)=>{
    const config = {
      headers:{
        "auth-token": token
      }
    };
    async function deleteNote(){
      try {
        const deleteData = await axios.delete(`http://localhost:4000/api/notes/deletenote/${todo._id}`,config)
        const success = deleteData.data.success;
      if (success) {
      setFetch(!fetch)
      }
      } catch (error) {
        console.log(error)
      }
    }
    deleteNote();
  }
  const putNote = () => {
    if (!etitle || !edesc) {
        alert("etitle or Description cannot be blank");
    }
    const config = {
      headers:{
        "auth-token": token,
        "Content-Type": "application/json"
      }
    }
    async function update(){
      try {
      const updateData =  await axios.put(`http://localhost:4000/api/notes/updatenote/${todoId}`,newTodo,config)
      const success = updateData.data.success;
      if (success) {
      setFetch(!fetch)
      }
      } catch (error) {
        console.log(error)
      }
    }
    if (etitle && edesc && edp && cdp) {
      newTodo ={
        title: etitle,
        description: edesc,
        image: edp.name,
        change: cdp
    }
    const formdata = new FormData();
    formdata.append("myefile",edp);
    async function updateImg(){
      try {
        await axios.post(`http://localhost:4000/api/notes/updateimg`,formdata)
      } catch (error) {
        console.log(error)
      }
    }
    if (edp!==cdp) {
        updateImg()
    }
    update();
    }
    else{
      newTodo ={
        title: etitle,
        description: edesc,
    }
    update()
  }
}
  const onUpdate=(todo)=>{
   setEdesc(todo.description);
   setEtitle(todo.title);
   setCDp(todo.image);
   setId(todo._id);
   ref.current.click();
  }
  return (
    <>
    <AddTodo addTodo={addTodo} />
    <button type="button" ref={ref} className="btn btn-primary d-none"  data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-etitle" id="exampleModalLabel">Modal etitle</h5>
        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form onSubmit={putNote}>
                <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Todo etitle</label>
                    <input type="text" value={etitle} onChange={(e) => setEtitle(e.target.value)} className="form-control" id="etitle" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="edesc" className="form-label">Todo Description</label>
                    <input type="text" value={edesc} onChange={(e) => setEdesc(e.target.value)} className="form-control" id="edesc" />
                </div>
                <div className="mb-3">
                    <label htmlFor="edp" className="form-label">Todo Image</label>
                    <input type="file"  onChange={(e) => setEDp(e.target.files[0])}
                    className="form-control" id="edp" />
                </div>
                <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-primary" onClick={putNote} data-bs-dismiss="modal">Save changes</button>
      </div>
            </form>
      </div>
     
    </div>
  </div>
</div>
    <Todo todos = {notes}  onDelete={onDelete} onUpdate={onUpdate}/>
    </>
  )
}

export default Home
