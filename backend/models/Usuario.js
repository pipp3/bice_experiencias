import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Comentario from "./Comentario.js";
import Foro from "./Foro.js";
import Encuesta from "./Encuesta.js";

const { Schema } = mongoose;

const usuarioSchema=mongoose.Schema({
    nombre:{
        type:String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    area:{
        type:Number,
        required:true,
        trim:true,
    },
    rol:{
        type:String,
        required:true,
        trim:true,
    },
    token:{
        type:String,
    },
    confirmado:{
        type:Boolean,
        default:false,
    },
    foros: [{ type: Schema.Types.ObjectId, ref: 'Foro' }],
    comentarios: [{ type: Schema.Types.ObjectId, ref: 'Comentario' }],
    encuesta:[{type:Schema.Types.ObjectId,ref:'Encuesta'}]
},
);
usuarioSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt)
})

usuarioSchema.methods.comprobarPassword=async function(passwordFormulario){
    return await bcrypt.compare(passwordFormulario,this.password)
}
const Usuario=mongoose.model("Usuario",usuarioSchema);

export default Usuario;