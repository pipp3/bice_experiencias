import mongoose from "mongoose";

const reporteSchema=mongoose.Schema({
    reportado:{
        type:String,
        required: true,
        trim: true,
    },
    reportante:{
        type:String,
        required: true,
        trim: true,
    },
    motivo:{
        type:String,
        required: true,
        trim: true,
    },
    descripcion:{
        type:String,
        required: true,
        trim: true,
    },
    revisado:{
        type:Boolean,
        trim: true,
    },
    respuesta:{
        type:String,
        trim: true,
    }
})

const Reporte=mongoose.model("Reporte",reporteSchema);

export default Reporte;