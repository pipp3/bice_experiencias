import mongoose from "mongoose";
import Encuesta from "./Encuesta.js";
import Respuesta from "./Respuesta.js";

const { Schema } = mongoose;

const preguntaSchema=mongoose.Schema({
    nombre:{
        type:String,
        required: true,
        trim: true,
    },
    tipo:{
        type:String,
        required: true,
        trim: true,
    },
    encuesta_id:{
        type: Schema.Types.ObjectId, ref: 'Encuesta'
    },
    respuestas:[{type: Schema.Types.ObjectId, ref: 'Respuesta'}]
})


const Pregunta=mongoose.model("Pregunta",preguntaSchema);

export default Pregunta;