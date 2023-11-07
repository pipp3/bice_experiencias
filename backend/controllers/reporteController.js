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

export {report}