import Respuesta from "../models/Respuesta.js";
import Pregunta from "../models/Pregunta.js";
import Usuario from "../models/Usuario.js";
const crear_respuesta = async (req, res) => {
  const user_id = req.usuario._id;
  const encuesta_id = req.params.id;
  const { respuestas } = req.body;
  try {
    // Iterar sobre cada respuesta en el array
    for (const { idPregunta, respuesta } of respuestas) {
      // Crear una nueva respuesta en la base de datos
      const nuevaRespuesta = await Respuesta.create({
        pregunta_id: idPregunta,
        respuesta: respuesta,
      });

      // Actualizar la pregunta para agregar el ID de la nueva respuesta a su array de respuestas
      await Pregunta.findByIdAndUpdate(idPregunta, {
        $push: { respuestas: nuevaRespuesta._id },
      });
    }
    // Actualizar el usuario para agregar el ID de la encuesta al array de encuestas respondidas
    await Usuario.findByIdAndUpdate(user_id, {
      $push: { encuesta: encuesta_id },
    });
    res.json({ msg: "Respuestas guardadas exitosamente" });
  } catch (error) {
    console.error("Error al guardar respuestas:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export { crear_respuesta };
