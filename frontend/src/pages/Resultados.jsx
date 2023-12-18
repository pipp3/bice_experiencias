import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import clientAxios from "../config/ClientAxios";


const Resultados = () => {
  // Simulación de datos (reemplázalos con las llamadas reales a la API)
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState([]);
  const { id } = useParams();
  // Llamada a la API para obtener preguntas y respuestas
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
      if (!token) {
        console.log("Cerrando sesion");
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response=await clientAxios.get(`/encuestas/resultados/${id}`, config);

        setPreguntas(response.data.preguntas);
        setRespuestas(response.data.respuestas);
        
        
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
     <h1 className="text-3xl font-bold mb-4">Resultados de la Encuesta</h1>
     {console.log(respuestas)}
      {preguntas.map((pregunta, index) => (
       <BarCharts key={index} pregunta={pregunta} respuestas={respuestas} />
      ))}
    </div>
  );
};

export default Resultados;
