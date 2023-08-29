import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";


const registrar = async (req, res) => {
    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({ email });
  
    if (existeUsuario) {
      const error = new Error("Usuario ya registrado");
      return res.status(400).json({ msg: error.message });
    }
    try {
      const usuario = new Usuario(req.body);
      usuario.token = generarId();
  
      const usuarioAlmacenado = await usuario.save();
  
      res.json({msg:'Usuario creado correctamente. Revisa tu email para confirmar tu cuenta'});
    } catch (error) {
      console.log(error);
    }
  };

  export {registrar}

