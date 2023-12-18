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
    const id_user = req.usuario._id.toString();
    const id_foro=req.params.id
  
    Foro.findById(id_foro)
    .then(foro => {
      if (!foro) {
        return res.status(404).json({ mensaje: 'Foro no encontrado' });
      }
      //console.log(foro.creador.toString());
      // Verifica si el foro pertenece al usuario logueado
      if (foro.creador.toString() !== id_user) {
        return res.status(403).json({ mensaje: 'No tienes permiso para eliminar este foro' });
      }

      // Si el foro le pertenece al usuario, elimínalo
      foro.deleteOne()
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

const edit_foro=async(req,res)=>{
  const id_foro = req.params.id;
  const nuevosDatos = req.body;
  try {
    // Buscar el foro en la base de datos por su ID y actualizar los campos necesarios
    const foro = await Foro.findByIdAndUpdate(id_foro, nuevosDatos, { new: true });

    if (!foro) {
      return res.status(404).json({ mensaje: 'Foro no encontrado' });
    }

    return res.status(200).json({ mensaje: 'Foro editado correctamente', foro });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }

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
const get_foro=async(req,res)=>{
  const id_foro = req.params.id;
  try {
    const foro = await Foro.findById(id_foro);

    if (!foro) {
      return res.status(404).json({ msg: 'Foro no encontrado' });
    }

    res.status(200).json(foro);
  } catch (error) {
    console.error('Error al obtener el foro', error);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
}

const listar_foros=async(req,res)=>{
  try {
    // Obtener todos los foros ordenados por fecha de creación de forma descendente
    const foros = await Foro.find().sort({creacion: -1 });

    res.status(200).json(foros);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
}

export {create_foro,delete_foro,mostrar_foros,edit_foro,get_foro,listar_foros}