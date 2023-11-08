import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Alert from "../components/Alert";
import clientAxios from "../config/ClientAxios";
import useAuth from "../hooks/useAuth";
import { AuthProvider } from "../context/AuthProvider";

const Reportar = () => {
  const { auth } = useAuth();
  const [email, setEmail] = useState("");
  const [motivo, setMotivo] = useState("");
  const [alert, setAlert] = useState({});
  const [descripcion, setDescripcion] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([email,motivo,descripcion].includes("")) {
      setAlert({
        msg: "Ingrese un usuario a reportar y motivo por hacerlo",
        error: true,
      });
      return;
    
    }
    try {
      const emailReportante=auth.email;
      const {data}=await clientAxios.post('/reportes/reportar',{email,motivo,descripcion,emailReportante})
      setAlert({msg:"Usuario Reportado" , error :false})
      
    } catch (error) {
      setAlert({
        msg:error.response.data.msg,
        error:true
      })
    }
  };

  const { msg } = alert;

  return (
    <div className="container mx-auto mt-5 md:mt-3 p-5 md:flex md:justify-center">
      <div className="md:3/5 lg:w-2/5 bg-white shadow rounded-md px-10 py-5">
        <h1 className="text-sky-600 font-black text-4xl capitalize mt-3">
          Reporta empleados !
        </h1>
        <h3 className="text-gray-400 text-xl font-black">
          {" "}
          Reporta a
          <span className="text-sky-500">
            {" "}
            un empleado por mal comportamiento
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
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
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
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripcion del reporte"
            cols="30"
            rows="10"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-200 cursor-pointer"
          />

          <label
            htmlFor="email"
            className=" font-bold uppercase block text-xl text-gray-600 mt-3"
          >
            Email Laboral
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Laboral del Usuario a Reportar"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-200 cursor-pointer"
          />

          <input
            type="submit"
            value="Reportar Usuario"
            className="bg-sky-700 text-white w-full py-3 mt-5 font-bold rounded-md uppercase hover:cursor-pointer hover:bg-sky-900 transition-colors"
          />
        </form>
      </div>
    </div>
  );
};

export default Reportar;

