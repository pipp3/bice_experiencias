import clientAxios from "../config/ClientAxios";
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EncuestasCardsDisp from "../components/EncuestasCardsDisp";
const Encuestas = () => {
  const [encuestas, setEncuestas] = useState([]);
  useEffect(() => {
    // Función para obtener encuestas
    const obtenerEncuestas = async () => {
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

        const response = await clientAxios.get(
          "/encuestas/disponibles",
          config
        );
        const data = await response.data;
        setEncuestas(data);
      } catch (error) {
        console.error("Error al obtener encuestas:", error);
      }
    };

    // Llama a la función para obtener encuestas al cargar la página
    obtenerEncuestas();
  }, []);
  return (
    <div>
        <div className="mt-8 ml-10">
          <h2 className="text-sky-600 text-2xl font-semibold mb-4">
            Encuestas Disponibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {encuestas.map((encuesta) => (
              <EncuestasCardsDisp key={encuesta._id} encuesta={encuesta} />
            ))}
          </div>
        </div>
    </div>
  )
}

export default Encuestas