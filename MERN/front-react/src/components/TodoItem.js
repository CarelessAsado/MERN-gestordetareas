import React, { useState, useRef } from "react";

export const TodoItem = ({
  tarea,
  deleteTarea,
  changeCompletada,
  beginUpdateDescripcion,
  finishUpdateDescripcion,
}) => {
  const [inputTarea, setInputTarea] = useState(tarea.descripcion);
  const [isEditing, setIsEditing] = useState(false);
  /*-----------------------*/
  const inputAModificar = useRef();
  /*------------------------------------*/

  return (
    <div className="tareaItem ">
      <input
        className={`${isEditing ? "edit" : ""} ${
          tarea.completada ? "completada" : ""
        } `}
        readOnly
        value={inputTarea}
        onChange={(e) => {
          setInputTarea(e.target.value);
        }}
        ref={inputAModificar}
      ></input>
      <div className="funcionalidadTareaItem">
        <i
          className="fas fa-check"
          onClick={() => changeCompletada(tarea.id)}
        ></i>
        {isEditing ? (
          <i
            className="far fa-save"
            onClick={() => {
              finishUpdateDescripcion(
                tarea.id,
                setIsEditing,
                inputAModificar,
                inputTarea,
                tarea.descripcion,
                setInputTarea
              );
            }}
          ></i>
        ) : (
          <i
            className="fas fa-pen"
            onClick={() =>
              beginUpdateDescripcion(inputAModificar, setIsEditing)
            }
          ></i>
        )}

        <i
          className="fas fa-trash"
          onClick={() => {
            deleteTarea(tarea.id);
          }}
        ></i>
      </div>
    </div>
  );
};
