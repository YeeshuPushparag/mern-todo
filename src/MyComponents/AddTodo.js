import React, { useState } from 'react';

export const AddTodo = ({ addTodo }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [dp, setDp] = useState(null);


    const submit = (e) => {
        e.preventDefault();
        if (!title || !desc || !dp) {
            alert("Title or Description or Picture cannot be blank");
        }
        else {
            addTodo(title, desc,dp);
            setTitle("");
            setDesc("");
            setDp(null);
        }
        document.getElementById("create-course-form").reset();
    }
    return (
        <div className="container my-3">
            <h3>Add a Todo</h3>
            <form onSubmit={submit} id ="create-course-form">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Todo Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" id="title" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Todo Description</label>
                    <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} className="form-control" id="desc" />
                </div>
                <div className="mb-3">
                    <label htmlFor="dp" className="form-label">Todo Image</label>
                    <input type="file"  onChange={(e) => setDp(e.target.files[0])}
                    className="form-control" id="dp" />
                </div>
                <button type="submit" className="btn btn-sm btn-success">Add Todo</button>
            </form>
        </div>
    )
}