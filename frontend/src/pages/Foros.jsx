import React, { useState, useEffect } from "react";
import clientAxios from "../config/ClientAxios";
import { useNavigate } from "react-router-dom";
const Foros = () => {
  const navigate=useNavigate();
  const [foros, setForos] = useState([]);
  
  useEffect(() => {
    // Realizar una solicitud para obtener la lista de foros desde tu servidor
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("Usuario no autenticado");
        }
  
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };  
        const response = await clientAxios.get("/foros/listar-foros",config); // Cambia la ruta según tu configuración
        setForos(response.data);
      } catch (error) {
        console.error("Error al obtener la lista de foros:", error);
      }
    };

    fetchData();
  }, []);
  const handleMostrar=(id)=>{
    navigate(`/foros/ver/${id}`);
  }
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Lista de Foros</h1>
      <ul>
        {foros.map((foro) => (
          <li key={foro._id} className="mb-4 p-4 border rounded">
            <h2 className="text-xl font-semibold mb-2">{foro.titulo}</h2>
            <p className="text-gray-600 mb-2">
              Creador: {foro.creador} | Asunto: {foro.asunto}
            </p>
            <p className="text-gray-600 mb-2">
              Fecha de Creación: {foro.creacion}
            </p>
            <p className="text-gray-600">
              Comentarios: {foro.comentarios.length}
            </p>
            <button onClick={()=>handleMostrar(foro._id)} className='bg-sky-500 text-white border rounded-lg py-2 px-3 uppercase cursor-pointer font-semibold my-2 mx-2 hover:bg-sky-700'>Mostrar</button>
          </li>
          
        ))}
      </ul>
      
    </div>
  );
};

export default Foros;
