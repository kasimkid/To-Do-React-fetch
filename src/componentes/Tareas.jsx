import React from "react"




const Tareas = ({listaTarea,deletItem}) => {
  
  

  return (
    <>
      <ul>
      {listaTarea?.map((element, index)=> {
        return(
        <li className="tarea-asignada" key={index}>{element.label} <button className="btns" onClick={() => deletItem(index)}><i className="fa-regular fa-trash-can"></i></button></li>
        )
      })}
      </ul>
      
    </>


  )
}

export default Tareas
