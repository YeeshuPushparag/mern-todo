import { useState, React } from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";

export const Login = () => {
  let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    async function loginUser(){
        const data = {
            email: email,
            password: password,
          }
        try {
          const loginData = await axios.post("http://localhost:4000/api/auth/login",data)
          let token = loginData.data.auth_token
          localStorage.setItem('token',token);
          navigate("/");
        } catch (error) {
          console.log(error)
        }
      }

    const submit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Email or Password cannot be blank");
        }
        else{
          loginUser();
        }
    }
  return (
    <div className="container my-3">
    <h3>Login</h3>
    <form onSubmit={submit}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" aria-describedby="emailHelp" />

        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" />
        </div>
        <button type="submit" className="btn btn-sm btn-success">Login</button>
    </form>
</div>
  )
}
