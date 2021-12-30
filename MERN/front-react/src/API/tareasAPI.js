import axios from "axios";
import { urlTarea as url } from "./url";

export const tareasAPI = {
  config: (token) => {
    return { headers: { auth: token } };
  },
  fetchTareasTodas: async (token) => {
    let response = await fetch(url, tareasAPI.config(token));
    if (!response.ok) {
      throw Error("Hubo un error en la conexión.");
      /*-----VER GRAY----------------*/
    }
    let data = await response.json();
    return data.map((item) => {
      return {
        id: item._id,
        descripcion: item.descripcion,
        completada: item.completada,
      };
    });
  },
  borrarTarea: async (id, token) => {
    const { data } = axios.delete(url + `/${id}`, tareasAPI.config(token));
    return data;
  },
  guardarTareaPost: async ({ descripcion }, token) => {
    const { data } = await axios.post(
      url,
      { descripcion },
      tareasAPI.config(token)
    );
    return data;
  },
  borrarTarea: async (id, token) => {
    const { data } = axios.delete(url + `/${id}`, tareasAPI.config(token));
    return data;
  },

  actualizarTarea: async (id, itemAActualizar, token) => {
    let { data } = await axios.patch(
      url + `/${id}`,

      itemAActualizar,
      tareasAPI.config(token)
    );
    return data;
  },
};
