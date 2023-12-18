import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Alert from "../components/Alert";
import clientAxios from "../config/ClientAxios";
const CrearEncuesta = () => {
  const [nombre, setNombre] = useState("");
  const [alert, setAlert] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([nombre].includes("")) {
      setAlert({
        msg: "Hay uno o mas campos vacios",
        error: true,
      });
      return;
    }
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
      const { data } = await clientAxios.post("/encuestas/crear_encuesta", {
        nombre,
      },config);
      setAlert({ msg: "Encuesta Creada Correctamente", error: false });
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
          Crea tus encuestas !
        </h1>
        <h3 className="text-gray-400 text-xl font-black">
          {" "}
          Conoce la opinion
          <span className="text-sky-500"> de tus empleados</span>
        </h3>
        {msg && <Alert alert={alert} />}
        <form onSubmit={handleSubmit} className="my-5">
          <label
            htmlFor="nombre"
            className=" font-bold uppercase block text-xl text-gray-600"
          >
            Nombre Encuesta
          </label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre de la encuesta"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-200 cursor-pointer"
          />

          <input
            type="submit"
            value="Crear Encuesta"
            className="bg-sky-700 text-white w-2/5 py-3 mt-5 font-bold rounded-md uppercase hover:cursor-pointer hover:bg-sky-900 transition-colors content-center"
          />
          <Link
            to="/panel"
            className="bg-sky-700 text-white text-center w-1/5 py-3 mt-5 float-right font-bold rounded-md uppercase hover:cursor-pointer hover:bg-sky-900 transition-colors content-center"
          >
            Volver
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CrearEncuesta;
