const mongoose = require("mongoose");
const { TareaSchema } = require("./tareas");

const User = new mongoose.Schema({
  emailUsuario: {
    type: String,
    required: [true, "Proveer email."],
    /*-------------OJO Q ESTO NO ES UN VALIDATOR-------------*/
    unique: [true, "Ya existe un usuario registrado con ese mail."],
  },
  fecha: {
    type: Date,
    default: Date.now,
    /*---------VER COMO ADAPTARLO A HORARIO ARGENTINO*/
  },
  contraseña: {
    type: String,
    required: [true, "Proveer contraseña."],
  },
  tareas: [TareaSchema],
});

module.exports = mongoose.model("User", User);
