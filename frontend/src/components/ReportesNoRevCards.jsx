import React from "react";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import { AuthProvider } from "../context/AuthProvider";
import clientAxios from "../config/ClientAxios";
import { useNavigate } from "react-router-dom";

const ReportesNoRevCards = ({ reporte }) => {
  const { reportado, reportante, motivo, descripcion } = reporte;
  const navigate=useNavigate();
  const handleResponder=async()=>{
    const {_id} = reporte;
    try {
        if(_id){
          navigate(`/panel/responder-reporte/${_id}`,{
            state:{motivo,descripcion,reportado,reportante}
          });
        }else{
          console.error('No se proporcionó un ID de foro válido');
        }
      } catch (error) {
        console.error('Error al editar el foro', error);
      }
  }
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 m-4 w-full">
      <h2 className="text-2xl font-bold text-sky-700">{motivo}</h2>
      <p className="text-gray-500 font-semibold">Asunto: {descripcion}</p>
      <p className="text-gray-500 font-semibold">Creador: {reportante}</p>
      <p className="text-gray-500 font-semibold">
        Reportado: {reportado}
      </p>
      <button
        onClick={handleResponder}
        className="bg-sky-500 text-white border rounded-lg py-2 px-3 uppercase cursor-pointer font-semibold my-2 mx-2 hover:bg-sky-700"
      >
        Responder
      </button>
      
    </div>
  );
};
ReportesNoRevCards.propTypes = {
    reporte: PropTypes.object.isRequired,
  };

export default ReportesNoRevCards;
