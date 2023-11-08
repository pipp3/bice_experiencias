import Usuario from "../models/Usuario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";

const delete_user = async (req, res) => {
    const user = await Usuario.findOne({ "email" :req.body.email });
    if (user) {
      await Usuario.deleteOne({'email':req.body.email})
      res.json({ msg: "Usuario Eliminado Correctamente" });
    }
     else {
      const error = new Error("Email invalido. Pruebe con otro");
      return res.status(404).json({ msg: error.message });
    }
  };

  const create_user = async (req, res) => {
    const { nombre , password , email , area , rol } = req.body;
    const user = await Usuario.findOne({ email });
    if (!user) {
        Usuario.create({'nombre' : nombre, 'password' : password , 'email' : email , 'area' : area, 'rol' : rol ,'confirmado':false});
        res.json({ msg: "Usuario creado con exito" });
    } else {
      const error = new Error("Email ya asociado a un usuario");
      return res.status(404).json({ msg: error.message });
    }
  };
  const edit_user = async (req, res) => {
    // Get the user's name, email, area, and role from the request body.
    const { nombre, email, area, rol } = req.body;
  
    // Find the user with the specified email address.
    const user = await Usuario.findOne({ email });
  
    // If the user is found, update the user's role.
    if (user) {
      const update = {
        "$set": {
          "nombre": nombre,
          "rol": rol,
          "area": area
        }
      };
  
      // Update the user in the database.
      await Usuario.updateOne({ email }, update);
  
      // Send a response back to the client.
      res.json({ msg: "Usuario Actualizado Correctamente" });
    } else {
      const error = new Error("Usuario No Encontrado");
      return res.status(404).json({ msg: error.message });
    }
  };
  

  export {delete_user,create_user,edit_user};