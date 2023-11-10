import React from 'react';
import PropTypes from 'prop-types';
import useAuth from "../hooks/useAuth";
import { AuthProvider } from "../context/AuthProvider";
import clientAxios from '../config/ClientAxios';
import { useNavigate } from 'react-router-dom';


const ForoCard = ({ foro }) => {
  const { titulo, asunto, creador, creacion, comentarios,_id } = foro;
  const { auth } = useAuth();
  const navigate=useNavigate();

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
      await clientAxios.delete(`/foros/eliminar_foro/${_id}`,config);
      navigate("/perfil/mis-foros");
      // Lógica adicional después de eliminar, por ejemplo, recargar la lista de foros
    } catch (error) {
      console.error('Error al eliminar el foro', error);
    }
  };

  const handleEditar=async()=>{
    try {
      if(_id){
        navigate(`/perfil/editar-foro/${_id}`);
      }else{
        console.error('No se proporcionó un ID de foro válido');
      }
    } catch (error) {
      console.error('Error al editar el foro', error);
    }
    
    
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 m-4 w-2/4">
      <h2 className="text-2xl font-bold text-sky-700">{titulo}</h2>
      <p className="text-gray-500 font-semibold">Asunto: {asunto}</p>
      <p className="text-gray-500 font-semibold">Creador: {auth.email}</p>
      <p className="text-gray-500 font-semibold">Fecha de Creación: {creacion}</p>
      <p className="text-gray-500 font-semibold">Comentarios: {comentarios.length}</p>
      <button  onClick={handleEliminar} className='bg-red-500 text-white border rounded-lg py-2 px-3 uppercase cursor-pointer font-semibold my-2 hover:bg-red-700'>Eliminar</button>
      <button onClick={handleEditar} className='bg-sky-500 text-white border rounded-lg py-2 px-3 uppercase cursor-pointer font-semibold my-2 mx-2 hover:bg-sky-700'>Editar</button>
      {/* Agrega cualquier otro detalle que desees mostrar en la tarjeta */}
    </div>
  );
};

ForoCard.propTypes = {
  foro: PropTypes.object.isRequired,
};

export default ForoCard;
