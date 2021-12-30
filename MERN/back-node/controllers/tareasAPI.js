const { TareaModel: Tarea } = require("../models/tareas");
const User = require("../models/User");

async function guardarTarea(req, res) {
  try {
    const todasTareas = await User.findById({ _id: req.user }, "tareas");
    let nuevaTarea = new Tarea(req.body);
    todasTareas.tareas.push(nuevaTarea);
    await todasTareas.save();
    res.status(201).json(nuevaTarea);
  } catch (error) {
    console.log(error.errors);
    if (error.name == "ValidationError") {
      let errors = Object.values(error.errors).map((val) => val.message);
      if (errors.length > 1) {
        return res.status(400).json(errors.join(" "));
      } else {
        return res.status(400).json(errors);
      }
    } else {
      res.status(500).json(error);
    }
  }
}

async function getAllTareas(req, res) {
  try {
    const { tareas: tareasTodas } = await User.findById(
      { _id: req.user },
      "tareas"
    );
    res.status(200).json(tareasTodas);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function borrarTarea(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findOne({ "tareas._id": req.params.id });
    if (user._id != req.user) {
      return res.status(403).json("No estás autorizado.");
    }
    let tareasAGuardar = user.tareas.filter((item) => item._id != id);
    user.tareas = tareasAGuardar;
    await user.save();
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function actualizarTarea(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findOne({ "tareas._id": id });
    let tareaUpdated = {};
    if (user._id != req.user) {
      return res.status(403).json("No estás autorizado.");
    }
    let tareasUpdated = user.tareas.map((item) => {
      if (item._id == id) {
        for (let key in req.body) {
          item[key] = req.body[key];
        }
        tareaUpdated = item;
        return tareaUpdated;
      }
      return item;
    });
    user.tareas = tareasUpdated;
    await user.save();
    res.status(200).end();
  } catch (error) {
    res.status(500).json(error);
  }
}
module.exports = { guardarTarea, getAllTareas, borrarTarea, actualizarTarea };
