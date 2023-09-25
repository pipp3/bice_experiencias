import Usuario from "../models/Usuario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";

const Eliminar_usuario = async (req, res) => {
    const { email } = req.params;
  
    const user = await Usuario.findOne({ email });
  
    if (user) {
        Usuario.deleteOne({"email":email})
        res.json({ msg: "email valido, usuario eliminado" });
    } else {
      const error = new Error("email invalido, ingrese otro");
      return res.status(404).json({ msg: error.message });
    }
  };

  const Crear_usuario = async (req, res) => {
    const { nombre , password , email , area , rol } = req.body;
  
    const user = await Usuario.findOne({ email });
  
    if (!user) {
        Usuario.create({'nombre' : nombre, 'password' : password , 'email' : email , 'area' : area, 'rol' : rol });
        res.json({ msg: "Usuario creado con exito" });
    } else {
      const error = new Error("Email ya asociado a un usuario");
      return res.status(404).json({ msg: error.message });
    }
  };
  const cambiar_rol = async (req, res) => {
    const {email , rol } = req.body;
  
    const user = await Usuario.findOne({ email });
  
    if (user) {
        user.rol = rol
        res.json({ msg: "rol actualizado" });
    } else {
      const error = new Error("usuario desconocido");
      return res.status(404).json({ msg: error.message });
    }
  };