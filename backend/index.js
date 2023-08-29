import express from 'express';
import dotenv from "dotenv";
import conectarDB from './config/db.js';


const app= express();
app.use(express.json());

dotenv.config();

conectarDB();

//Routing
//app.use("/api/usuarios",usuarioRoutes);


const PORT = process.env.PORT || 4000;
app.listen(4000,()=>{
    console.log(`Corriendo en el puerto ${PORT}`);
});