import Reporte from "../models/reporte.js";
import Usuario from "../models/Usuario.js";
const report = async(req,res)=>{
    const {email,descripcion,motivo,emailReportante}=req.body;
  
    const usuario = await Usuario.findOne({ email });
  
    if(usuario){
      Reporte.create({'reportado':email,'motivo': motivo,'descripcion':descripcion,'reportante':emailReportante})
      res.json({ msg: "Reporte Enviado Exitosamente" });
    }
    else{
      const error = new Error("Usuario no encontrado");
      return res.status(404).json({ msg: error.message });
    }
  }
  const mis_reportes = async (req, res) => {
    try {
      const user_id = req.usuario._id;
      const user = await Usuario.findById(user_id);

      const reportes = await Reporte.find({ reportante: user.email });
  
      if (reportes.length > 0) {
        res.json( reportes );
      } else {
        res.json({ msg: "No se encontraron reportes para este usuario." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error al obtener los reportes del usuario." });
    }
  };

export {report,mis_reportes}