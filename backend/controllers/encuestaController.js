import Usuario from "../models/Usuario.js";
import Encuesta from "../models/Encuesta.js";
import Pregunta from "../models/Pregunta.js";
import Respuesta from "../models/Respuesta.js";

const create_enc = async (req, res) => {
  
  try {
    const { nombre } = req.body;
    const estado = false;
    // Asegurarse de que el usuario esté autenticado
    if (!req.usuario || !req.usuario._id) {
      return res.status(401).json({ msg: "Autenticación requerida" });
    }
    const creador = req.usuario._id;
    const nuevaEncuesta = await Encuesta.create({ nombre, creador, estado });
    res.json({
      msg: "Encuesta creada exitosamente, ahora añadele preguntas",
      encuesta: nuevaEncuesta,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Error al crea la encuesta", error: error.message });
  }
};

const delete_enc = async (req, res) => {
  const id_encuesta = req.params.id;

  Encuesta.findById(id_encuesta)
    .then((encuesta) => {
      if (!encuesta) {
        return res.status(404).json({ mensaje: "Encuesta no encontrada" });
      }
      encuesta
        .deleteOne()
        .then(() => {
          res.json({ mensaje: "Encuesta eliminada con éxito" });
        })
        .catch((error) => {
          res
            .status(500)
            .json({ mensaje: "Error al eliminar la encuesta", error });
        });
    })
    .catch((error) => {
      res.status(500).json({ mensaje: "Error al buscar la encuesta", error });
    });
};

const mostrar_encuestas = async (req, res) => {
  try {
    const encuestas = await Encuesta.find();
    res.json(encuestas);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al buscar encuestas", error: error.message });
  }
};

const get_encuesta = async (req, res) => {
  const id_encuesta = req.params.id;
  try {
    // Buscar la encuesta por su ID
    const encuesta = await Encuesta.findById(id_encuesta);

    if (!encuesta) {
      return res.status(404).json({ msg: "Encuesta no encontrada" });
    }

    // Buscar las preguntas que pertenecen a la encuesta
    const preguntas = await Pregunta.find({ encuesta_id: id_encuesta });

    // Incluir las preguntas en la respuesta JSON de la encuesta
    const encuestaConPreguntas = { ...encuesta.toObject(), preguntas };

    res.status(200).json(encuestaConPreguntas);
  } catch (error) {
    console.error("Error al obtener la encuesta:", error);
    res.status(500).json({ msg: "Error al obtener la encuesta", error: error.message });
  }
};

const publicar_encuesta = async (req, res) => {
  const id_encuesta = req.params.id;
  try {
    const encuesta = await Encuesta.findById(id_encuesta);

    if (!encuesta) {
      return res.status(404).json({ msg: "Encuesta no encontrada" });
    }
    // Verifica si la encuesta ya está publicada
    if (encuesta.estado) {
      return res.status(400).json({ msg: "La encuesta ya está publicada" });
    }

    // Actualiza el campo 'publicada' de la encuesta a true
    encuesta.estado = true;
    await encuesta.save();

    res.json({ msg: "Encuesta publicada exitosamente" });
  } catch (error) {
    console.error("Error al publicar la encuesta", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};
const encuestas_disponibles=async(req,res)=>{
 
  try {
    const usuarioId = req.usuario._id;

    // Buscar el usuario por su ID
    const usuario = await Usuario.findById(usuarioId);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Obtener el array de encuestas respondidas por el usuario
    const encuestasRespondidas = usuario.encuesta || [];
    
    // Buscar las encuestas disponibles que no han sido respondidas por el usuario
    const encuestasDisponibles = await Encuesta.find({
      estado: true,
      _id: { $nin: encuestasRespondidas },
    });
    

    res.status(200).json(encuestasDisponibles);
  } catch (error) {
    console.error("Error al buscar encuestas:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }

}

const resultados = async (req, res) => {
  const idEncuesta = req.params.id;

  try {
    // Busca las preguntas de la encuesta
    const preguntas = await Pregunta.find({ encuesta_id: idEncuesta,tipo: 'satisfaccion' });

    // Busca las respuestas de las preguntas de la encuesta
    const respuestas = await Respuesta.find({ pregunta_id: { $in: preguntas.map(p => p._id) } });

    res.json({ preguntas, respuestas });
  } catch (error) {
    console.error('Error al obtener preguntas y respuestas:', error);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

export {
  create_enc,
  delete_enc,
  mostrar_encuestas,
  get_encuesta,
  publicar_encuesta,
  encuestas_disponibles,resultados
};
