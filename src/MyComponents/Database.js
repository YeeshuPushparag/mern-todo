import React, { useEffect ,useState} from 'react'
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import AdminCollection from './AdminCollection'
import NoteCollection from './NoteCollection'
import UserCollection from './UserCollection'

function Database() {
    const [collection, setCollection] = useState([]);
    const [Alist, setAList] = useState([]);
    const [Nlist, setNList] = useState([]);
    const [Ulist, setUList] = useState([]);
    const [ACollection, setACollection] = useState(false);
    const [NCollection, setNCollection] = useState(false);
    const [UCollection, setUCollection] = useState(false);
    let navigate = useNavigate();
    if (!sessionStorage.getItem("success")) {
     navigate("/admin/login") 
    }
    async function showDatabase(){
        const collect = await axios.post("http://localhost:4000/api/admin/showcoll")
        setCollection(collect.data)
        const ACollect = await axios.post("http://localhost:4000/api/admin/showadmin")
        const NCollect = await axios.post("http://localhost:4000/api/admin/shownotes")
        const UCollect = await axios.post("http://localhost:4000/api/admin/showusers")
        setAList(ACollect.data)
        setNList(NCollect.data)
        setUList(UCollect.data)
    }
    useEffect(() => {
      showDatabase();
    },[]);
   function showdata(e){
        if(e==="admins"){
             setACollection(true);
             setNCollection(false);
             setUCollection(false);
        }
        if(e==="notes"){
             setNCollection(true);
             setACollection(false);
             setUCollection(false);
        }
        if(e==="users"){
             setUCollection(true);
             setACollection(false);
             setNCollection(false);
        }
    }
  return (
    <>
    <div>{collection.map((element,e) => {
   return <h3 className="text-center m-3 d-inline-block" key={e} onClick={()=>{showdata(element)}}>{element.toUpperCase()}</h3>
  })}</div>
  {!ACollection?<div></div>:<AdminCollection list={Alist}/>}
  {!NCollection?<div></div>:<NoteCollection list={Nlist}/>}
  {!UCollection?<div></div>:<UserCollection list={Ulist}/>}
    </>
  )
}

export default Database
