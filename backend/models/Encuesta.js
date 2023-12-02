import mongoose from "mongoose";
import Usuario from "./Usuario.js";
import Pregunta from "./Pregunta.js";

const { Schema } = mongoose;

const encuestaSchema=mongoose.Schema({
    nombre:{
        type:String,
        required: true,
        trim: true,
    },
    estado:{
        type:String,
        required: true,
        trim: true,
    },
    creacion:{
        type:String,
        default: () => {
            const now = new Date();
            const dd = String(now.getDate()).padStart(2, '0');
            const mm = String(now.getMonth() + 1).padStart(2, '0'); // +1 porque enero es 0
            const aaaa= String(now.getFullYear()); // Obtiene los últimos 2 dígitos del año
            return `${dd}-${mm}-${aaaa}`;
          }
    },
    creador:{
        type: Schema.Types.ObjectId, ref: 'Usuario'
    },
    preguntas: [{type: Schema.Types.ObjectId, ref: 'Pregunta'}]
    

})


const Encuesta=mongoose.model("Encuesta",encuestaSchema);

export default Encuesta;