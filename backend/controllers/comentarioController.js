import Comentario from "../models/Comentario.js";
import Foro from "../models/Foro.js";
const create_com = async (req, res) => {
  try {
    // Validar la entrada
    const { creador, comentario } = req.body;
    const foroId = req.params.id; // Asegúrate de obtener el ID del foro correctamente

    // Asegurarse de que el usuario esté autenticado
    if (!req.usuario || !req.usuario._id) {
      return res.status(401).json({ msg: "Autenticación requerida" });
    }

    // Asegúrate de que el foro existe antes de intentar agregar un comentario
    const foroExistente = await Foro.findById(foroId);
    if (!foroExistente) {
      return res.status(404).json({ msg: "Foro no encontrado" });
    }

    // Crear el comentario
    const nuevoComentario = await Comentario.create({
      creador: creador,
      mensaje: comentario,
      foro: foroId,
    });
    foroExistente.comentarios.push(nuevoComentario._id);
    await foroExistente.save(); // Guardar los cambios en el documento del foro

    res.json({
      msg: "Comentario creado exitosamente",
      comentario: nuevoComentario,
    });
  } catch (error) {
    // Manejar errores específicos y proporcionar mensajes de error claros
    console.error(error);
    res
      .status(500)
      .json({ msg: "Error al crear el comentario", error: error.message });
  }
};
const get_comentarios = async (req, res) => {
    try {
      const foroId = req.params.id; // Asegúrate de obtener el ID del foro correctamente
  
      // Asegurarse de que el usuario esté autenticado
      if (!req.usuario || !req.usuario._id) {
        return res.status(401).json({ msg: "Autenticación requerida" });
      }
  
      // Asegúrate de que el foro existe antes de intentar obtener comentarios
      const foroExistente = await Foro.findById(foroId);
      if (!foroExistente) {
        return res.status(404).json({ msg: "Foro no encontrado" });
      }
  
      // Obtener los comentarios asociados al foro
      const comentarios = await Comentario.find({ foro: foroId });
      res.status(200).json(comentarios);
    } catch (error) {
      // Manejar errores específicos y proporcionar mensajes de error claros
      console.error(error);
      res.status(500).json({ msg: "Error al obtener comentarios", error: error.message });
    }
  };
  

export { create_com,get_comentarios };
