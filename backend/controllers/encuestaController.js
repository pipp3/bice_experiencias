import Usuario from "../models/Usuario.js";
import Encuesta from "../models/Encuesta.js";

const create_enc = async (req, res) => {
  try {
    const { nombre } = req.body;
    const estado = "creada";
    // Asegurarse de que el usuario esté autenticado
    if (!req.usuario || !req.usuario._id) {
      return res.status(401).json({ msg: "Autenticación requerida" });
    }
    const creador = req.usuario._id;
    const nuevaEncuesta = await Encuesta.create({ nombre, creador, estado });
    res.json({
      msg: "Encuesta creada exitosamente, ahora añadele preguntas",
      foro: nuevoForo,
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
    const encuesta = await Encuesta.findById(id_encuesta);

    if (!encuesta) {
      return res.status(404).json({ msg: "Encuesta no encontrada" });
    }

    res.status(200).json(encuesta);
  } catch (error) {
    console.error("Error al obtener la encuesta", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export { create_enc, delete_enc, mostrar_encuestas,get_encuesta };
