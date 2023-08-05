import React, { useEffect, useState } from "react"
import Tareas from "./componentes/Tareas"

function App() {

  const [tarea, setTarea] = useState({label:"", done: false})
  const [listaTarea, setListaTarea] = useState([])
  

  const handleChange = (e) => {
    setTarea ({
      label: e.target.value,
      done: false
    })

  }


  const handleSubmit = (e) => {
    e.preventDefault()
    const newList = [...listaTarea, tarea]
    setListaTarea(newList)
    setTarea({label:"", done: false})
    putData(newList)
}

  const deletItem = (id) => {
    const newTask = [...listaTarea]
    newTask.splice(id, 1)
    setListaTarea(newTask)
    deleteData(newTask)
  }


  const getData = () => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/rafael", {
      method:"GET",
      headers:{
        "Content-Type": "application/json"
      }
      })
    .then(data =>{
      console.log(data)
      return data.json()
    })
    .then(resp => {
      console.log(resp)

    })
    .catch(error => {
      console.log(error)
    })

  }
useEffect(() => {
  getData()
}, [])


const putData = (newList) => {
  fetch("https://playground.4geeks.com/apis/fake/todos/user/rafael", {
    method:"PUT",
    body: JSON.stringify(newList),
    headers:{
      "Content-Type": "application/json"
    }
    })
  .then(data =>{
    
    console.log(data)
    return data.json()
  })
  .then(resp => {
    console.log(resp)

  })
  .catch(error => {
    console.log(error)
  })
}

const deleteData = (newList) => {
  fetch('https://playground.4geeks.com/apis/fake/todos/user/rafael', {
    method:"PUT",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newList),

  })
  .then(data => {
    return data.json()
  })
  .then(resp => {
    console.log(resp)
  })
  .catch(error =>{
    console.log(resp)
  })
}




  return (
    <div className="contenedor">
      <div className="lista">
        <h1>To-do List</h1>
        <form onSubmit={handleSubmit}>

          <input type="text" value={tarea.label} placeholder=" Agree one task" onChange={handleChange} />

        </form>
        <Tareas listaTarea={listaTarea} deletItem={deletItem} />
        {listaTarea.length > 0 ? (<div><p>{listaTarea.length} items</p></div>) : null}
      </div>
    </div>

  )
}

export default App
