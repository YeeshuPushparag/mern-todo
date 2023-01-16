import { useState, React } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
const AdminLogin = () => {
    const [password, setPassword] = useState("");
    let navigate = useNavigate();
    async function loginAdmin(){
        const data = {
            password: password,
          }
        try {
          const adminData = await axios.post("http://localhost:4000/api/admin/loginadmin",data)
          let success = adminData.data.success;
          sessionStorage.setItem('success',success);
          if (success) {
            navigate("/admin/database")
          }
        } catch (error) {
          console.log(error)
        }
      }
    const submit = (e) => {
        e.preventDefault();
        if (!password) {
            alert("Password cannot be blank");
        }
        else{
          loginAdmin();
        }
    }
  
    
  return (
    
    <>
        <div className="container my-3"><h3>Admin</h3>
    <form onSubmit={submit}>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" />
        </div>
        <button type="submit" className="btn btn-sm btn-success">Login</button>
    </form>
    <button className="btn btn-sm btn-primary my-2" onClick={()=> navigate("/admin/signup")}>Sign Up</button>
</div>
<div className="container my-3">
</div>
</>
  )
}

export default AdminLogin