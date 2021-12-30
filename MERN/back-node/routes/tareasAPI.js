const express = require("express");
const router = express.Router();
const {
  guardarTarea,
  getAllTareas,
  borrarTarea,
  actualizarTarea,
} = require("../controllers/tareasAPI");

router.get("/", getAllTareas);
router.post("/", guardarTarea);
router.delete("/:id", borrarTarea);
router.patch("/:id", actualizarTarea);

module.exports = router;
