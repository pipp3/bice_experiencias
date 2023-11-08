import mongoose from "mongoose";
import Foro from "./Foro.js";

const { Schema } = mongoose;

const comentarioSchema=mongoose.Schema({
    creador:{
        type:String,
        required: true,
        trim: true,
    },
    mensaje:{
        type:String,
        required: true,
        trim: true,
    },
    creacion:{
        type:Date,
        required: true,
        trim: true,
    },
    foro: {
         type: Schema.Types.ObjectId,
         ref: 'Foro'
    }
})

const Comentario=mongoose.model("Comentario",comentarioSchema);

export default Comentario;