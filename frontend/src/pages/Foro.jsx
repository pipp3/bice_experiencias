import React, { useState, useEffect } from "react";
import clientAxios from "../config/ClientAxios";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Foro = () => {
  const { id } = useParams();
  const [foro, setForo] = useState(null);
  const [comentario, setComentario] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const { auth } = useAuth();
  useEffect(() => {
    const fetchForoDetalle = async () => {
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

        const response = await clientAxios.get(
          `/foros/obtener_foro/${id}`,
          config
        );
        setForo(response.data);
      } catch (error) {
        console.error("Error al obtener detalles del foro:", error);
      }
    };

    fetchForoDetalle();
  }, [id]);

  useEffect(() => {
    const obtenerComentarios = async () => {
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
        // Hacer una solicitud para obtener comentarios utilizando el ID del foro
        const response = await clientAxios.get(
          `/comentarios/get_comentarios/${id}`,
          config
        );
        setComentarios(response.data);
      } catch (error) {
        console.error("Error al obtener comentarios:", error);
      }
    };

    obtenerComentarios();
  }, [id]);

  const handleNuevoComentario = async (e) => {
    e.preventDefault();
    const creador = auth.email;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Usuario no autenticado");
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clientAxios.post(
        `/comentarios/crear_comentario/${id}`,
        { creador, comentario },
        config
      );

      // Actualizar los detalles del foro después de agregar el comentario
      fetchForoDetalle();

      // Limpiar el campo de comentario después de enviar
      setComentario("");
    } catch (error) {
      console.error("Error al agregar comentario:", error);
    }
  };
  if (!foro) {
    return <p>Cargando detalles del foro...</p>;
  }

  return (
    <div className="container mx-auto mt-8 flex">
      <div className="w-2/3 pr-8">
        <h1 className="text-2xl font-bold mb-4 ">{foro.titulo}</h1>
        <p className="text-gray-600 mb-4">Creador: {foro.creador}</p>
        <p className="text-gray-600 mb-4">Asunto: {foro.asunto}</p>
        <p className="text-gray-600 mb-4">Fecha de Creación: {foro.creacion}</p>

        <h2 className="text-xl font-semibold mb-2">Comentarios: </h2>
        <ul>
          {comentarios.map((comentario, index) => (
            <li
              key={comentario._id}
              className={`mb-4 border-b-2 pb-2 ${
                index !== comentarios.length - 1 ? "border-gray-300" : ""
              }`}
            >
              <p className="text-gray-600 mb-2">
                Usuario: {comentario.creador}
              </p>
              <p className="text-gray-600">{comentario.mensaje}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-1/3">
        <form onSubmit={handleNuevoComentario} className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Agregar Comentario</h2>
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Escribe tu comentario..."
          />
          <button
            type="submit"
            className="bg-sky-500 text-white border rounded-lg py-2 px-3 uppercase cursor-pointer font-semibold mt-2 hover:bg-sky-700"
          >
            Enviar Comentario
          </button>
        </form>
      </div>
    </div>
  );
};

export default Foro;
