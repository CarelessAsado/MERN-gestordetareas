//IMPORTAR MODELO
const User = require("../models/User");
const { TareaModel: Tarea } = require("../models/tareas");
/*---BCRYPT----------*/
const bcrypt = require("bcrypt");
/*-----JWT--------------*/
const jwt = require("jsonwebtoken");

async function registerUsuario(req, res) {
  try {
    const { emailUsuario, contraseña, confirmaContraseña } = req.body;
    /*---------------PRE VALIDATION------------------------*/
    let errorString = "";
    if (!emailUsuario || !confirmaContraseña || !contraseña) {
      errorString += "No puede haber campos vacíos. ";
    }
    if (contraseña && (contraseña.length < 6 || contraseña.length > 15)) {
      errorString += "La contraseña debe tener entre 6 y 15 carácteres. ";
    }
    if (contraseña && confirmaContraseña != contraseña) {
      errorString += "Las contraseñas no condicen. ";
    }
    if (errorString) {
      return res.status(400).json(errorString);
    }
    /*-----VALIDAR contraseña*/ //********************* */
    let passHashed = await bcrypt.hash(contraseña, 10);
    let usuarioACrear = new User({
      emailUsuario,
      contraseña: passHashed,
    });
    const nuevoUsuario = await usuarioACrear.save();
    /*-----setSuccess en REACT FRONT*/
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    if (error.name == "ValidationError") {
      let errors = Object.values(error.errors).map((val) => val.message);
      if (errors.length > 1) {
        return res.status(400).json(errors.join(" "));
      } else {
        return res.status(400).json(errors);
      }
      //DUPLICATE KEY
    } else if (error.code == 11000) {
      res.status(409).send("Ya existe un usuario registrado con ese mail.");
    } else {
      res.status(500).json(error);
    }
  }
}

async function loginUsuario(req, res) {
  const { emailUsuario, contraseña } = req.body;
  if (!emailUsuario || !contraseña) {
    return res.status(400).json("No puede haber campos vacíos");
  }
  try {
    let user = await User.findOne({ emailUsuario });

    if (!user) {
      return res.status(401).json("Usuario o contraseña no coinciden.");
    }

    if (await bcrypt.compare(contraseña, user.contraseña)) {
      /*----MAGIA JWT--------------*/
      const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 86400,
      });
      return res.status(200).json(accessToken);
    } else {
      return res.status(401).json("Usuario o contraseña no coinciden.");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
}
module.exports = { registerUsuario, loginUsuario };
