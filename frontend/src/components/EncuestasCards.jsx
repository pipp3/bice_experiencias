import React from 'react';

const EncuestasCards = ({ encuesta }) => {
  return (
    <div className="bg-white p-4 border rounded shadow-md">
      <h3 className="text-lg font-semibold mb-2">{encuesta.nombre}</h3>
      <p className="text-sm text-gray-600">Creador: {encuesta.creador}</p>
      <p className="text-sm text-gray-600">Fecha de creacion: {encuesta.creacion}</p>
      <p className="text-sm text-gray-600">Estado: {encuesta.estado}</p>
      {/* Agrega más información de la encuesta según sea necesario */}
    </div>
  );
};

export default EncuestasCards;