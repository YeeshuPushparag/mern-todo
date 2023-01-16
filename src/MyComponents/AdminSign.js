import { useState, React } from "react";
import axios from "axios";


const AdminSign = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    async function createAdmin(){
        const data = {
            name: name,
            password: password,
          }
        try {
          const adminData = await axios.post("http://localhost:4000/api/admin/createadmin",data)
          console.log(adminData.data)
        } catch (error) {
          console.log(error)
        }
      }
    const submit = (e) => {
      e.preventDefault()
        if (!name || !password) {
            alert("Email or Password cannot be blank");
        }
        else{
          createAdmin();
        }
    }
  return (
    <div className="container my-3">
    <h3>Admin</h3>
    <form onSubmit={submit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="name" />

        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" />
        </div>
        <button type="submit" className="btn btn-sm btn-success">Sign Up</button>
    </form>
</div>
  )
}

export default AdminSign