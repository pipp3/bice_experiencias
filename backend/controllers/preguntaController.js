import Usuario from "../models/Usuario.js";
import Encuesta from "../models/Encuesta.js";
import Pregunta from "../models/Pregunta.js";
const create_question = async (req, res) => {
    const encuesta_id = req.params.id;
    const { nombre, tipo } = req.body; // Obtener nombre y tipo del cuerpo de la solicitud
  
    try {
      // Asegurarse de que el usuario esté autenticado
      if (!req.usuario || !req.usuario._id) {
        return res.status(401).json({ msg: "Autenticación requerida" });
      }
  
      const nuevaPregunta = await Pregunta.create({
        nombre,
        tipo,
        encuesta_id
      });
      
  
      res.json({
        msg: "Pregunta creada exitosamente",
        pregunta: nuevaPregunta,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: "Error al crear la pregunta",
        error: error.message,
      });
    }
  };
  


export { create_question };