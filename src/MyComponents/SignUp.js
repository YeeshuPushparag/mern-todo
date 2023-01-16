import { useState, React } from "react";
import { useNavigate} from 'react-router-dom';
import axios from "axios";

export const SignUp = () => {
  let navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function SignUpUser(){
        const data = {
            name: name,
            email: email,
            password: password,
          }
        try {
          const signData =await axios.post("http://localhost:4000/api/auth/createuser",data)
          let token = signData.data.auth_token
          localStorage.setItem('token',token);
        } catch (error) {
          console.log(error)
        }
      }

    const submit = (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            alert("Name or Email or Password cannot be blank");
        }
        else {
          SignUpUser();
          setName("");
          setEmail("");
          setPassword("");
          navigate("/");
      }
    }
  return (
    <div className="container my-3">
    <h3>Sign Up</h3>
    <form onSubmit={submit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="name" aria-describedby="emailHelp" />

        </div>
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

