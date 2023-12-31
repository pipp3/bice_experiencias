import React from 'react'
import { Link, useNavigate,useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import Alert from "../components/Alert";
import clientAxios from "../config/ClientAxios";
import useAuth from "../hooks/useAuth";
import { AuthProvider } from "../context/AuthProvider";

const EditarForo = () => {
    const [titulo, setTitulo] = useState("");
    const [asunto, setAsunto] = useState("");
    const [alert, setAlert] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const obtenerDatosForo = async () => {
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
            const { data } = await clientAxios.get(`/foros/obtener_foro/${id}`,config);
            // Establecer los datos del foro en los estados
            setTitulo(data.titulo);
            setAsunto(data.asunto);
          } catch (error) {
            console.error('Error al obtener datos del foro', error);
          }
        };
    
        obtenerDatosForo();
      }, [id]);

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        if ([titulo, asunto].includes("")) {
          setAlert({
            msg: "Hay uno o mas campos vacios",
            error: true,
          });
          return;
        }
        try {
          const token = localStorage.getItem("token");
          if (!token){
            console.log("Cerrando sesion")
          }
    
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          const { data } = await clientAxios.put(`/foros/editar_foro/${id}`, {
            titulo,
            asunto,
          },config);
          setAlert({ msg: "Foro Editado Correctamente", error: false });
        } catch (error) {
          setAlert({
            msg: error.response.data.msg,
            error: true,
          });
        }
      };
      const { msg } = alert;

  return (
    <div className="container mx-auto mt-5 md:mt-3 p-5 md:flex md:justify-center">
      <div className="md:3/5 lg:w-3/5 bg-white shadow rounded-md px-10 py-5">
        <h1 className="text-sky-600 font-black text-4xl capitalize mt-3">
          Edita tu foro !
        </h1>
        <h3 className="text-gray-400 text-xl font-black">
          {" "}
          Cambia tus foros
          <span className="text-sky-500"> si te expresaste mal</span>
        </h3>
        {msg && <Alert alert={alert} />}
        <form onSubmit={handleSubmit} className="my-5">
          <label
            htmlFor="titulo"
            className=" font-bold uppercase block text-xl text-gray-600"
          >
            Titulo
          </label>
          <input
            id="titulo"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Titulo de tu foro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-200 cursor-pointer"
          />

          <label
            htmlFor="asunto"
            className=" font-bold uppercase block text-xl text-gray-600 mt-3"
          >
            Asunto
          </label>
          <textarea
            rows="4"
            id="asunto"
            type="text"
            value={asunto}
            onChange={(e) => setAsunto(e.target.value)}
            placeholder="Describe tus ideas..."
            className="w-full mt-3 p-3 border rounded-xl bg-gray-200 cursor-pointer"
          ></textarea>

          <input
            type="submit"
            value="Editar Foro"
            className="bg-sky-700 text-white w-2/5 py-3 mt-5 font-bold rounded-md uppercase hover:cursor-pointer hover:bg-sky-900 transition-colors content-center"
          />
          <Link
              to="/perifl/mis-foros"
              className="bg-sky-700 text-white text-center w-1/5 py-3 mt-5 float-right font-bold rounded-md uppercase hover:cursor-pointer hover:bg-sky-900 transition-colors content-center"
            >
              Volver
            </Link>
        </form>
      </div>
    </div>
  )
}

export default EditarForo