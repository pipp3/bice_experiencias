import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js'
<<<<<<< HEAD
import adminRoutes from './routes/adminRoutes.js'
import reportRoutes from './routes/reportRoutes.js'
=======
>>>>>>> ba37c3450a41cdca14008b6b8c88d683414a86ca

const app= express();
app.use(express.json());

dotenv.config();

conectarDB();

//CORS
const whitelist = [process.env.FRONTEND_URL];
const corsOptions={
    origin:function(origin,callback){
        
        if(whitelist.includes(origin)){
            callback(null,true)
        }else{
            callback(new Error("Error de cors"))
        }
    }
}
<<<<<<< HEAD
=======

app.use(cors(corsOptions))

//Routing
app.use("/api/usuarios",usuarioRoutes);
>>>>>>> ba37c3450a41cdca14008b6b8c88d683414a86ca

app.use(cors(corsOptions))

//Routing
app.use("/api/usuarios",usuarioRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/reportes",reportRoutes);

const PORT = process.env.PORT || 4000;
app.listen(4000,()=>{
    console.log(`Corriendo en el puerto ${PORT}`);
});