const mongoose = require("mongoose");

const TareaSchema = new mongoose.Schema({
  descripcion: {
    type: String,
    required: [true, "Proveer descripción de la tarea"],
  },
  completada: { type: Boolean, default: false },
  fecha: {
    type: Date,
    default: Date.now,
    /*---------VER COMO ADAPTARLO A HORARIO ARGENTINO*/
  },
  //Debería ponerle owner:user?
});

const TareaModel = mongoose.model("Tarea", TareaSchema);

module.exports = { TareaModel, TareaSchema };
