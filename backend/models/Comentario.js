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
        type:String,
        default: () => {
            const now = new Date();
            const dd = String(now.getDate()).padStart(2, '0');
            const mm = String(now.getMonth() + 1).padStart(2, '0'); // +1 porque enero es 0
            const aaaa= String(now.getFullYear()); // Obtiene los últimos 2 dígitos del año
            return `${dd}-${mm}-${aaaa}`;
          }
    },
    foro: {
         type: Schema.Types.ObjectId,
         ref: 'Foro'
    }
})

const Comentario=mongoose.model("Comentario",comentarioSchema);

export default Comentario;