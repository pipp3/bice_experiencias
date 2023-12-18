import React from 'react'
import clientAxios from "../config/ClientAxios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const EncuestasCardsDisp = ({ encuesta }) => {
    const { _id } = encuesta;
    const navigate = useNavigate();
    const handleVer=async()=>{
        try {
            if (_id) {
              navigate(`/encuestas/responder/${_id}`);
            } else {
              console.error("No se proporcionó un ID de foro válido");
            }
          } catch (error) {
            console.error("Error al editar el foro", error);
          }
    }
  return (
    <div className="bg-white p-4 border rounded shadow-md w-full">
      <h3 className="text-lg font-semibold mb-2">{encuesta.nombre}</h3>
      <p className="text-sm text-gray-600">
        Fecha de creacion: {encuesta.creacion}
      </p>
      <button
        onClick={handleVer}
        className="bg-sky-500 text-white border rounded-lg py-2 px-3 flex uppercase cursor-pointer font-semibold my-2 hover:bg-sky-700"
      >
        Responder
      </button>
      
    
      {/* Agrega más información de la encuesta según sea necesario */}
    </div>
  )
}

export default EncuestasCardsDisp