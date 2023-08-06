import React, { useEffect, useState } from "react"
import Tareas from "./componentes/Tareas"
import Error from "./componentes/Error"

function App() {

  const [tarea, setTarea] = useState({ label: "", done: false })
  const [listaTarea, setListaTarea] = useState([])
  const [alert, setAlert] = useState(false)

  const handleChange = (e) => {
    setTarea({
      label: e.target.value,
      done: false
    })

  }


  const handleSubmit = (e) => {
    e.preventDefault()
    if (tarea.label === "") {
      setAlert (true)
      return
    }
    setListaTarea([...listaTarea, tarea])
    putData2([...listaTarea, tarea])
    setTarea({ label: "", done: false })
    setAlert(false)
  }

  const deletItem = (id) => {
    const deletedTask = listaTarea.filter((tarea, index) => index !== id)
    setListaTarea(deletedTask)
    deletedData(deletedTask)

  }

  const getData2 = async () => {
    const url = "https://playground.4geeks.com/apis/fake/todos/user/rafael"
    const resp = await fetch(url)
    const data = await resp.json()
    setListaTarea(data)
  }

  // const getData = () => {
  //   fetch("https://playground.4geeks.com/apis/fake/todos/user/rafael", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then(data => {
  //       console.log(data)
  //       return data.json()
  //     })
  //     .then(resp => {
  //       console.log(resp)

  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })

  // }
  useEffect(() => {
    getData2()
  }, [])

  const putData2 = async (newList) => {
    const url = "https://playground.4geeks.com/apis/fake/todos/user/rafael"
    const request = {
      method: "PUT",
      body: JSON.stringify(newList),
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
      const resp = await fetch(url, request)
      const data = await resp.json()
      console.log(data)

    } catch (error) {
      console.log(error)
    }

  }
  // const putData = (newList) => {
  //   fetch("https://playground.4geeks.com/apis/fake/todos/user/rafael", {
  //     method: "PUT",
  //     body: JSON.stringify(newList),
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then(data => {

  //       console.log(data)
  //       return data.json()
  //     })
  //     .then(resp => {
  //       console.log(resp)

  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }

  const deletedData = (newList) => {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/rafael', {
      method: "PUT",
      headers: {
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
      .catch(error => {
        console.log(error)
      })
  }




  return (
    <div className="contenedor">
      <div className="lista">
        <h1>To-do List</h1>
        <form onSubmit={handleSubmit}>

          <input type="text" value={tarea.label} placeholder=" Agree one task" onChange={handleChange} />

        </form>
        {alert ?
          <Error mensaje="Este campo es obligatorio*" />
          : null
        }
        <Tareas listaTarea={listaTarea} deletItem={deletItem} />
        {listaTarea.length > 0 ? (<div><p>{listaTarea.length} items</p></div>) : null}
      </div>
    </div>

  )
}

export default App
