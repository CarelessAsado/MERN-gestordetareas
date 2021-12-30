import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TodoItem } from "./TodoItem";
import { tareasAPI } from "../API/tareasAPI";

export const TodoForm = () => {
  /*---------REDIRECT---------------------*/
  let navigate = useNavigate();
  /*/-----------------------------------*/
  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState([]);
  const [inputNuevaTarea, setInputNuevaTarea] = useState("");

  /*---------------------------SECCION FILTRO---------------------*/
  /*--------------------------------------------------------------*/
  const [stateFilter, setStateFilter] = useState("Todas");
  const [filteredTodos, setFilteredTodos] = useState([]);
  /*----en base al stateFilter voy a decidir de mostrar todas, algunas u otras*/
  useEffect(() => {
    if (stateFilter === "Todas") {
      return setFilteredTodos(tareas);
    } else if (stateFilter === "Completadas") {
      return setFilteredTodos(
        tareas.filter((item) => item.completada === true)
      );
    }
    return setFilteredTodos(tareas.filter((item) => item.completada === false));
  }, [tareas, stateFilter]);

  /*-------CONEXION DATABASE------------*/
  /*------get tareas ON LOAD*/
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    async function fetchAPI() {
      if (!token) {
        return navigate("/login");
      }
      try {
        const data = await tareasAPI.fetchTareasTodas(token);
        setTareas(data);
        setError([]);
      } catch (error) {
        if (error.message === "Failed to fetch") {
          return setError(["Hubo un problema en la conexión."]);
        }
        setError([error.message]);
      }
    }
    fetchAPI();
    // eslint-disable-next-line
  }, []);
  /*------------GUARDAR TAREAS CON AXIOS.POST---------------*/
  //aca hay q mandar el TOKEN en Headers
  async function handleSubmit(e) {
    e.preventDefault();
    if (!inputNuevaTarea) {
      return setError("No puede haber campos vacíos");
    }
    try {
      const {
        _id: id,
        descripcion,
        completada,
      } = await tareasAPI.guardarTareaPost(
        { descripcion: inputNuevaTarea },
        token
      );
      setError([]);
      setTareas([
        ...tareas,
        {
          descripcion,
          completada,
          id,
        },
      ]);
      setInputNuevaTarea("");
    } catch (error) {
      if (error.message === "Network Error") {
        return setError(["Hubo un problema en la conexión."]);
      }
      setError([error.response.data]);
    }
  }
  async function deleteTarea(id) {
    try {
      await tareasAPI.borrarTarea(id, token);
      setTareas(tareas.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error.response, "hola esto anda en borrar tarea");
      if (error.message === "Network Error") {
        return setError(["Hubo un problema en la conexión."]);
      }
      setError([error.response.data]);
    }
  }
  async function changeCompletada(id) {
    let { descripcion, completada } = tareas.find((item) => item.id === id);
    try {
      await tareasAPI.actualizarTarea(
        id,
        {
          descripcion,
          completada: !completada,
        },
        token
      );

      setTareas(
        tareas.map((item) =>
          item.id === id ? { ...item, completada: !item.completada } : item
        )
      );
    } catch (error) {
      if (error.message === "Network Error") {
        return setError(["Hubo un problema en la conexión."]);
      }
      setError([error.response.data]);
    }
  }
  function beginUpdateDescripcion(inputAModificar, setIsEditing) {
    setIsEditing(true);
    inputAModificar.current.focus();
    inputAModificar.current.removeAttribute("readonly");
  }
  async function finishUpdateDescripcion(
    id,
    setIsEditing,
    inputAModificar,
    inputTarea,
    descripcionOriginal,
    setInputTarea
  ) {
    if (!inputTarea) {
      return setError("No puede haber campos vacíos");
    }
    if (inputTarea.trim() === descripcionOriginal) {
      setInputTarea(descripcionOriginal);
      return setIsEditing(false);
    }
    try {
      let { completada } = tareas.find((item) => item.id === id);
      await tareasAPI.actualizarTarea(
        id,
        {
          descripcion: inputTarea,
          completada,
        },
        token
      );
      setIsEditing(false);
      inputAModificar.current.setAttribute("readonly", true);
      setTareas(
        tareas.map((item) =>
          item.id === id ? { ...item, descripcion: inputTarea } : item
        )
      );
    } catch (error) {
      if (error.message === "Network Error") {
        setInputTarea(descripcionOriginal);
        setIsEditing(false);
        return setError(["Hubo un problema en la conexión."]);
      }
      setError([error.response.data]);
    }
  }

  return (
    <section className="main">
      {error.length > 0 ? (
        <div className="errorContainer">
          <div>{error}</div>
          <i className="fas fa-times" onClick={() => setError([])}></i>
        </div>
      ) : (
        ""
      )}
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="blockSubmitInput">
          <input
            className="nuevaTarea"
            type="text"
            value={inputNuevaTarea}
            onChange={(e) => {
              setInputNuevaTarea(e.target.value);
            }}
            placeholder="Ingresar tarea"
            autoFocus
          />
          <button>+</button>
        </div>
        <div className="select">
          <select
            value={stateFilter}
            onChange={(e) => {
              setStateFilter(e.target.value);
            }}
          >
            <option value="Todas">Todas las tareas</option>
            <option value="Completadas">Completadas</option>
            <option value="Inconclusas">Inconclusas</option>
          </select>
        </div>
      </form>
      <section className="containerTareaItems">
        {filteredTodos.length === 0 ? (
          <h4>No hay tareas para mostrar.</h4>
        ) : (
          filteredTodos.map((item) => (
            <TodoItem
              key={item.id}
              tarea={item}
              deleteTarea={deleteTarea}
              changeCompletada={changeCompletada}
              beginUpdateDescripcion={beginUpdateDescripcion}
              finishUpdateDescripcion={finishUpdateDescripcion}
              tareas={tareas}
            ></TodoItem>
          ))
        )}
      </section>
    </section>
  );
};
