import Reporte from "../models/reporte.js";
import Usuario from "../models/Usuario.js";
const report = async (req, res) => {
  const { email, descripcion, motivo, emailReportante } = req.body;

  const usuario = await Usuario.findOne({ email });

  if (usuario) {
    Reporte.create({
      reportado: email,
      motivo: motivo,
      descripcion: descripcion,
      reportante: emailReportante,
      revisado: false,
    });
    res.json({ msg: "Reporte Enviado Exitosamente" });
  } else {
    const error = new Error("Usuario no encontrado");
    return res.status(404).json({ msg: error.message });
  }
};
const mis_reportes = async (req, res) => {
  try {
    const user_id = req.usuario._id;
    const user = await Usuario.findById(user_id);

    const reportes = await Reporte.find({ reportante: user.email });

    if (reportes.length > 0) {
      res.json(reportes);
    } else {
      res.json({ msg: "No se encontraron reportes para este usuario." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener los reportes del usuario." });
  }
};

const get_reportes = async (req, res) => {
  try {
    // Modificar la consulta para obtener solo los reportes no revisados
    const reportes = await Reporte.find({ revisado: false });

    if (reportes.length > 0) {
      res.json(reportes);
    } else {
      res.json({
        success: true,
        msg: "No se encontraron reportes no revisados para este usuario.",
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        msg: "Error al obtener los reportes no revisados del usuario.",
        error: error.message,
      });
  }
};

const responder = async (req, res) => {
  const { respuesta } = req.body;
  const reporte_id = req.params.id;
  console.log(reporte_id)
  try {
    // Asegurarse de que el usuario esté autenticado
    if (!req.usuario || !req.usuario._id) {
      return res.status(401).json({ msg: "Autenticación requerida" });
    }
    const reporte = await Reporte.findById(reporte_id);
    if (!reporte) {
      return res.status(404).json({ msg: "Reporte no encontrado" });
    }
    reporte.respuesta = respuesta;
    reporte.revisado = true;
    // Guardar los cambios en la base de datos
    await reporte.save();

    // Envía una respuesta exitosa al cliente
    res.status(200).json({ msg: "Respuesta procesada correctamente" });
  } catch (error) {
    console.log(error)
  }
};

export { report, mis_reportes, get_reportes, responder };
