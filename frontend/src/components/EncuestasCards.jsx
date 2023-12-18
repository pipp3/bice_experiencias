import React from "react";
import clientAxios from "../config/ClientAxios";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { useState } from "react";

const EncuestasCards = ({ encuesta }) => {
  const { _id } = encuesta;
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleResultados=async()=>{
    navigate(`/panel/resultados/${_id}`);
  }
  const handleEliminar = async () => {
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
      await clientAxios.delete(`/encuestas/eliminar_encuesta/${_id}`, config);
      window.location.reload();
      // Lógica adicional después de eliminar, por ejemplo, recargar la lista de foros
    } catch (error) {
      console.error("Error al eliminar la encuesta", error);
    }
  };
  const handlePublicar = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Autenticacion requerida");
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      await clientAxios.post(`/encuestas/publicar/${_id}`, config);

      setModalIsOpen(true);
    } catch (error) {
      console.error("Error al publicar la encuesta", error);
    }
  };

  const closeModal = () => {
    // Cierra el modal y realiza cualquier otra lógica necesaria
    setModalIsOpen(false);
  };

  const handleEditar = async () => {
    try {
      if (_id) {
        navigate(`/panel/añadir-preguntas/${_id}`);
      } else {
        console.error("No se proporcionó un ID de foro válido");
      }
    } catch (error) {
      console.error("Error al editar el foro", error);
    }
  };

  return (
    <div className="bg-white p-4 border rounded shadow-md w-80">
      <h3 className="text-lg font-semibold mb-2">{encuesta.nombre}</h3>
      <p className="text-sm text-gray-600">Creador: {encuesta.creador}</p>
      <p className="text-sm text-gray-600">
        Fecha de creacion: {encuesta.creacion}
      </p>
      <p className="text-sm text-gray-600">
        Estado: {encuesta.estado ? "Publicado" : "Creada"}
      </p>
      <button
        onClick={handleEliminar}
        className="bg-red-500 text-white border rounded-lg py-2 px-3 flex uppercase cursor-pointer font-semibold my-2 hover:bg-red-700"
      >
        Eliminar
      </button>
      <button
        onClick={handleEditar}
        className="bg-sky-500 text-white border rounded-lg py-2 px-3 flex uppercase cursor-pointer font-semibold my-2 hover:bg-sky-700"
      >
        Añadir Preguntas
      </button>
      <button
        onClick={handlePublicar}
        className="bg-green-500 text-white border rounded-lg py-2 px-3 flex uppercase cursor-pointer font-semibold my-2 hover:bg-green-700"
      >
        Publicar
      </button>
      <button
        onClick={handleResultados}
        className="bg-rose-500 text-white border rounded-lg py-2 px-3 flex uppercase cursor-pointer font-semibold my-2 hover:bg-rose-700"
      >
        Ver Resultados
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Encuesta Publicada"
      >
        <h2>Encuesta Publicada Exitosamente</h2>
        <button onClick={closeModal}>Cerrar Modal</button>
      </Modal>
      {/* Agrega más información de la encuesta según sea necesario */}
    </div>
  );
};

export default EncuestasCards;
