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
        type:String,
        default: () => {
            const now = new Date();
            const dd = String(now.getDate()).padStart(2, '0');
            const mm = String(now.getMonth() + 1).padStart(2, '0'); // +1 porque enero es 0
            const aaaa= String(now.getFullYear()); // Obtiene los últimos 2 dígitos del año
            return `${dd}-${mm}-${aaaa}`;
          }
    },
    comentarios: [{ type: Schema.Types.ObjectId, ref: 'Comentario' }],
})


const Foro=mongoose.model("Foro",foroSchema);

export default Foro;