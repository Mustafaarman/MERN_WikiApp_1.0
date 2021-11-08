import React, { useState, useEffect } from "react"
import Pcard from "./components/Pcard"
import Addpost from "./components/Addpost"
import PcardEdit from "./components/PcardEdit"
import axios from "axios"
import { v4 as uuidv4 } from "uuid";
import "./components/app.css";

function App() {
  
   const [fetchData, setfetchData] = useState([])
   const [myinput, setinput] = useState({ title: "", content: "" })

   useEffect(async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users')
      const  myposts = response.data;
      setfetchData(myposts);
    }
    catch{
      console.log("something is wrong in fetching data")
    }
     
     
   }, [])

   

  function handleinput(e) {
    if(e.target.name === "title") {
      setinput((prev) => {
        return {
          name: e.target.value,
          username: prev.content
          }
        
      } )
    }
    else if (e.target.name === "content") {
      setinput((prev) => {
        return  {
          name: prev.title,
          username: e.target.value
        }
      }
        )
    }
    else{
      console.log("error happend");
    }
    
  }

async function deleteall() {
    try{
      const res = await axios.delete('https://jsonplaceholder.typicode.com/users')
    setfetchData([])
    }
    catch{
      console.log("something wrong in delete all items")
    }
  }

async function deleteone(id) {
    try{
      const respnse = await axios.delete('https://jsonplaceholder.typicode.com/users' + id)
      setfetchData((prev) => {
      return prev.filter((postl) => {
      return postl.id !== id;
        })
    }) 
    }

    catch{
      console.log('something wrong in ${id}')
     
    }
  }

async function handleSubmit(e) { 

   try{
     const newinput = {
      //id: uuidv4(),
      name: myinput.title,
      username: myinput.content
    }
    const hello = await axios.post('https://jsonplaceholder.typicode.com/users', newinput)
      setinput({name: "", usename: ""})
        e.preventDefault();
        setfetchData((prev) => {
          return [...prev, newinput]
        })
   }
   catch{
     console.log("something is wrong in adding")
   }
    
  }

  


  return (
    <div>
    <button onClick={() => { deleteall()}}>Delete All</button>
     <Addpost submitFun={handleSubmit} inputFun={handleinput} title={myinput.name} content={myinput.username} />
      { fetchData.map((apost) => {
      return (
        <div key={apost.id}>
          <Pcard key={apost.id} id={apost.id} title={apost.name} content={apost.username} deleteItem={deleteone} /> 
        </div>
           );
        })
      }
    </div>
  );
 
}


export default App;
