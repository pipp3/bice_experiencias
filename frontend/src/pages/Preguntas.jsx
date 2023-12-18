import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Alert from "../components/Alert";
import clientAxios from "../config/ClientAxios";

const Preguntas = () => {
  const { id } = useParams();
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState('');
  const [alert, setAlert] = useState({ msg: "", error: false });
  const [preguntas, setPreguntas] = useState([]);
  const handleTipoChange = (e) => {
    setTipo(e.target.value);
  };

  
 

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert({ msg: "", error: false });
    }, 3000); // Limpiar después de 5 segundos

    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar el componente
  }, [alert]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Valor de tipo en handleSubmit:', tipo);
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
      const { data } = await clientAxios.post(
        `/preguntas/crear_pregunta/${id}`,
        {
          nombre,
          tipo,
        },
        config
      );
      setPreguntas([...preguntas, data.pregunta]);

      // Limpiar los estados para permitir la adición de nuevas preguntas
      setNombre("");
      setTipo("");
      setAlert({ msg: "Pregunta Añadida Correctamente", error: false });
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
          Añade preguntas !
        </h1>
        <h3 className="text-gray-400 text-xl font-black">
          {" "}
          a tu
          <span className="text-sky-500"> encuesta</span>
        </h3>
        {msg && <Alert alert={alert} />}
        <form onSubmit={handleSubmit} className="my-5">
          <label
            htmlFor="nombre"
            className=" font-bold uppercase block text-xl text-gray-600"
          >
            Pregunta
          </label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre Pregunta"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-200 cursor-pointer"
          />

          <label
            htmlFor="tipo"
            className=" font-bold uppercase block text-xl text-gray-600"
          >
            Tipo de pregunta
          </label>
          <input
            type="radio"
            id="abierta"
            value="abierta"
            checked={tipo === 'abierta'}
            onChange={handleTipoChange}
          />
          <label htmlFor="abierta">Pregunta Abierta</label>

          <input
            type="radio"
            id="satisfaccion"
            value="satisfaccion"
            checked={tipo === 'satisfaccion'}
            onChange={handleTipoChange}
          />
          <label htmlFor="satisfaccion">Pregunta de Satisfacción</label>
          <input
            type="submit"
            value="Añadir Pregunta"
            className="bg-sky-700 text-white w-2/5 py-3 mt-5 font-bold rounded-md uppercase hover:cursor-pointer hover:bg-sky-900 transition-colors content-center"
          />
          <Link
            to="/panel"
            className="bg-sky-700 text-white text-center w-1/5 py-3 mt-5 float-right font-bold rounded-md uppercase hover:cursor-pointer hover:bg-sky-900 transition-colors content-center"
          >
            Salir
          </Link>
        </form>
      </div>

      <div className="mt-3 ml-10 bg-white shadow rounded-md px-5 py-5 w-full">
        <h2 className="text-sky-600 font-black text-2xl">
          Preguntas Añadidas:
        </h2>
        <ul>
          {preguntas.map((pregunta, index) => (
            <li key={index}>{pregunta.nombre}</li>
          ))}
        </ul>
      </div>
    </div>

  );
};

export default Preguntas;
