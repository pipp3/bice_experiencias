import Usuario from "../models/Usuario.js";
import Foro from "../models/Foro.js";


const create_foro=async(req,res)=>{
    const{titulo,asunto}=req.body;
    const creador=req.usuario._id;
    try {
        Foro.create({'titulo':titulo, 'asunto':asunto,'creador':creador})
        res.json({msg:'Foro creado exitosamente'})
    } catch (error) {
        res.status(500).json({ msg: 'Error al crear el foro', error });
    }
   

}
const delete_foro=async(req,res)=>{
    const id_user = req.usuario._id;
    const id_foro=req.params

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

const mostrar_foros=async(req,res)=>{
    const user_id=req.usuario._id;
    Foro.find({ creador: user_id })
    .then(foros => {
      res.json(foros); // Devuelve los foros encontrados
    })
    .catch(error => {
      res.status(500).json({ mensaje: 'Error al buscar foros', error });
    });
}

export {create_foro,delete_foro,mostrar_foros}