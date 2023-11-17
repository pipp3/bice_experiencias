import React from "react";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import { AuthProvider } from "../context/AuthProvider";
import clientAxios from "../config/ClientAxios";
import { useNavigate } from "react-router-dom";

const ReportesCards = ({ reporte }) => {
  const { reportado, reportante, motivo, descripcion } = reporte;
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 m-4 w-2/4">
      <h2 className="text-2xl font-bold text-sky-700">{motivo}</h2>
      <p className="text-gray-500 font-semibold">Asunto: {descripcion}</p>
      <p className="text-gray-500 font-semibold">Creador: {reportante}</p>
      <p className="text-gray-500 font-semibold">
        Reportado: {reportado}
      </p>
      {/*<button
        onClick={handleEliminar}
        className="bg-red-500 text-white border rounded-lg py-2 px-3 uppercase cursor-pointer font-semibold my-2 hover:bg-red-700"
      >
        Eliminar
      </button>
      <button
        onClick={handleEditar}
        className="bg-sky-500 text-white border rounded-lg py-2 px-3 uppercase cursor-pointer font-semibold my-2 mx-2 hover:bg-sky-700"
      >
        Editar
      </button>
      /* Agrega cualquier otro detalle que desees mostrar en la tarjeta */}
    </div>
  );
};
ReportesCards.propTypes = {
    reporte: PropTypes.object.isRequired,
  };

export default ReportesCards;
