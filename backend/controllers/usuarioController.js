import Usuario from "../models/Usuario.js";
<<<<<<< HEAD
import Reporte from "../models/reporte.js";
=======
>>>>>>> ba37c3450a41cdca14008b6b8c88d683414a86ca
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import { emailForgetPassword } from "../helpers/email.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario no existe o el email es incorrecto");
    return res.status(404).json({ msg: error.message });
  }
  if (!usuario.confirmado) {
    const error = new Error("Debes cambiar tu contraseña por defecto");
    return res.status(404).json({ msg: error.message });
  }
  if (await usuario.comprobarPassword(password)) {
    usuario.token = generarId();
    const usuarioAlmacenado = await usuario.save();
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      area: usuario.area,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("Contraseña incorrecta");
    return res.status(404).json({ msg: error.message });
  }
};
const forgetPassword = async (req, res) => {
  const { email } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario no existe o el email es incorrecto");
    return res.status(404).json({ msg: error.message });
  }
  try {
    usuario.token = generarId();
    await usuario.save();
    emailForgetPassword({
      email:usuario.email,
      nombre:usuario.nombre,
      token:usuario.token,
    })
    res.json({ msg: "Hemos enviado a email las instrucciones" });
  } catch (error) {
    console.log(error);
  }
};
const checkToken = async (req, res) => {
  const { token } = req.params;

  const tokenValue = await Usuario.findOne({ token });

  if (tokenValue) {
    res.json({ msg: "Token valido" });
  } else {
    const error = new Error("TOKEN NO VALIDO");
    return res.status(404).json({ msg: error.message });
  }
};


const changePassword = async(req,res)=>{
  const {password}=req.body;
  const {token}=req.params;

  const usuario = await Usuario.findOne({ token });
 
  if (usuario) {
    usuario.password = password;
    usuario.token = "";
    if(!usuario.confirmado){
      usuario.confirmado = true;
    }
    
    try {
      await usuario.save();
<<<<<<< HEAD
      res.json({ msg: "Contraseña Modificda Correctamente" });
=======
      res.json({ msg: "Contraseña Modificda correctamente" });
>>>>>>> ba37c3450a41cdca14008b6b8c88d683414a86ca
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("TOKEN NO VALIDO");
    return res.status(404).json({ msg: error.message });
  }


}
const profile = async (req, res) => {
  const { usuario } = req;
  res.json(usuario);
};

<<<<<<< HEAD

export { login,changePassword,checkToken,forgetPassword,profile};
=======
export { login,changePassword,checkToken,forgetPassword,profile };
>>>>>>> ba37c3450a41cdca14008b6b8c88d683414a86ca
