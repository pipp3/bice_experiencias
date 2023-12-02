import mongoose from "mongoose";
import Encuesta from "./Encuesta.js";
import Pregunta from "./Pregunta.js";
import Usuario from "./Usuario.js";

const { Schema } = mongoose;

const respuestaSchema=mongoose.Schema({
    empleado_id:{
        type: Schema.Types.ObjectId, ref: 'Usuario'
    },
    respuesta_usuario:{
        type:String,
        required: true,
        trim: true,
    },
    pregunta_id:{
        type: Schema.Types.ObjectId, ref: 'Pregunta'
    }
})


const Respuesta=mongoose.model("Respuesta",respuestaSchema);

export default Respuesta;