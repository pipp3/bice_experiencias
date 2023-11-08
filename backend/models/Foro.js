import mongoose from "mongoose";
import Usuario from "./Usuario.js";
import Comentario from "./Comentario.js";

const { Schema } = mongoose;

const foroSchema=mongoose.Schema({
    titulo:{
        type:String,
        required: true,
        trim: true,
    },
    creador:{
        type: Schema.Types.ObjectId, ref: 'Usuario',
    },
    asunto:{
        type:String,
        required: true,
        trim: true,
    },
    creacion:{
        type:Date,
        default: Date.now,
    },
    comentarios: [{ type: Schema.Types.ObjectId, ref: 'Comentario' }],
})

const Foro=mongoose.model("Foro",foroSchema);

export default Foro;