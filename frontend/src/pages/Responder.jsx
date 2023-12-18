import React, { useState } from 'react'
import { useLocation,useParams } from 'react-router-dom'
import Alert from '../components/Alert';
import clientAxios from '../config/ClientAxios';
const Responder = () => {
    const location = useLocation();
    const { motivo, descripcion,reportante,reportado } = location.state || {};
    const [respuesta,setRespuesta]=useState("")
    const [alert, setAlert] = useState({});
    const { id } = useParams();
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if ([respuesta].includes("")) {
            setAlert({
              msg: "Hay un campo vacio",
              error: true,
            });
            return;
          
          }
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
            const { data } = await clientAxios.post(
                `/reportes/responder/${id}`,
                {respuesta},
                config
              );
            setAlert({ msg: "Respuesta Enviada Correctamente", error: false });
          } catch (error) {
            setAlert({
                msg:error.response.data.msg,
                error:true
              })
          }
    }
    const { msg } = alert;
  return (
    <div className="container mx-auto mt-5 md:mt-3 p-5 md:flex md:justify-center">
      <div className="md:3/5 lg:w-2/5 bg-white shadow rounded-md px-10 py-5">
        <h1 className="text-sky-600 font-black text-4xl capitalize mt-3">
          Responde a los
        </h1>
        <h3 className="text-gray-400 text-xl font-black">
          {" "}
          Reportes de
          <span className="text-sky-500">
            {" "}
            tus empleados !
          </span>
        </h3>
        {msg && <Alert alert={alert} />}
        <form onSubmit={handleSubmit} className="my-5">
          <label
            htmlFor="motivo-reporte"
            className=" font-bold uppercase block text-xl text-gray-600 mt-3"
          >
            Motivo del Reporte
          </label>
          <input
            id="motivo-reporte"
            type="text"
            readOnly
            value={motivo}
            placeholder="Motivo del reporte"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-200 cursor-pointer"
          />
          <label
            htmlFor="descripcion-reporte"
            className=" font-bold uppercase block text-xl text-gray-600 mt-3"
          >
            Descripcion del Reporte
          </label>
          <textarea
            id="descripcion"
            readOnly
            value={descripcion}
            placeholder="Descripcion del reporte"
            cols="30"
            rows="10"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-200 cursor-pointer"
          />

          <label
            htmlFor="email"
            className=" font-bold uppercase block text-xl text-gray-600 mt-3"
          >
            Empleado Reportado
          </label>
          <input
            id="email"
            type="email"
            readOnly
            value={reportado}
            placeholder="Email Laboral del Usuario a Reportar"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-200 cursor-pointer"
          />
          <label
            htmlFor="respuesta"
            className=" font-bold uppercase block text-xl text-gray-600 mt-3"
          >
            Respuesta del Reporte
          </label>
          <textarea
            id="respuesta"
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            placeholder="Respuesta del reporte"
            cols="30"
            rows="10"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-200 cursor-pointer"
          />


          <input
            type="submit"
            value="Enviar Respuesta"
            className="bg-sky-700 text-white w-full py-3 mt-5 font-bold rounded-md uppercase hover:cursor-pointer hover:bg-sky-900 transition-colors"
          />
        </form>
      </div>
    </div>
  )
}

export default Responder