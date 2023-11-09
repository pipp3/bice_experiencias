import Usuario from "../models/Usuario.js";
import Foro from "../models/Foro.js";


const create_foro = async (req, res) => {
  try {
    // Validar la entrada
    const { titulo, asunto } = req.body;
    if (!titulo || !asunto) {
      return res.status(400).json({ msg: 'Se requieren título y asunto válidos' });
    }
   

    // Asegurarse de que el usuario esté autenticado
    if (!req.usuario || !req.usuario._id) {
      return res.status(401).json({ msg: 'Autenticación requerida' });
    }

    const creador = req.usuario._id;

    // Crear el foro
    const nuevoForo = await Foro.create({ titulo, asunto, creador });

     // Actualizar el usuario para agregar el ID del foro al campo 'foros'
     const usuarioActualizado = await Usuario.findByIdAndUpdate(
      creador,
      { $push: { foros: nuevoForo._id } }, // Agregar el ID del foro al array 'foros'
      { new: true } // Devolver el documento actualizado
    );
    res.json({ msg: 'Foro creado exitosamente', foro: nuevoForo });
  } catch (error) {
    // Manejar errores específicos y proporcionar mensajes de error claros
    console.error(error);
    res.status(500).json({ msg: 'Error al crear el foro', error: error.message });
  }
};

const delete_foro=async(req,res)=>{
    const id_user = req.usuario._id;
    const id_foro=req.params.id
    console.log('ID del usuario:', id_user);
    console.log('ID del foro:', id_foro);
    Foro.findById(id_foro)
    .then(foro => {
      if (!foro) {
        return res.status(404).json({ mensaje: 'Foro no encontrado' });
      }

      // Verifica si el foro pertenece al usuario logueado
      if (foro.creador.toString() !== id_user) {
        return res.status(403).json({ mensaje: 'No tienes permiso para eliminar este foro' });
      }

      // Si el foro le pertenece al usuario, elimínalo
      foro.remove()
        .then(() => {
          res.json({ mensaje: 'Foro eliminado con éxito' });
        })
        .catch(error => {
          res.status(500).json({ mensaje: 'Error al eliminar el foro', error });
        });
    })
    .catch(error => {
      res.status(500).json({ mensaje: 'Error al buscar el foro', error });
    });
      
    
}

const mostrar_foros = async (req, res) => {
  try {
    const user_id = req.usuario._id;
    const foros = await Foro.find({ creador: user_id }).exec();
    res.json(foros);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar foros', error: error.message });
  }
};

export {create_foro,delete_foro,mostrar_foros}