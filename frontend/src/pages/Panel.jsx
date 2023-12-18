import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EncuestasCards from "../components/EncuestasCards";
import ReportesNoRevCards from "../components/ReportesNoRevCards";
import { FaUserPlus, FaUserEdit, FaUserMinus } from "react-icons/fa";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { Axios } from "axios";
import clientAxios from "../config/ClientAxios";
const Panel = () => {
  const [encuestas, setEncuestas] = useState([]);
  const [reportes, setReportes] = useState([]);
  useEffect(() => {
    // Función para obtener encuestas
    const obtenerEncuestas = async () => {
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

        const response = await clientAxios.get(
          "/encuestas/mostrar_encuestas",
          config
        );
        const data = await response.data;
        setEncuestas(data);
      } catch (error) {
        console.error("Error al obtener encuestas:", error);
      }
    };

    // Llama a la función para obtener encuestas al cargar la página
    obtenerEncuestas();
  }, []); // El segundo argumento [] asegura que el efecto se ejecute solo una vez al montar el componente

  useEffect(() => {
    const obtenerReportes = async () => {
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
        const response = await clientAxios.get(
          "/reportes/reportes-no-revisados",
          config
        );
        const data = await response.data;
        setReportes(data);
      } catch (error) {
        console.error("Error al obtener los reportes:", error);
      }
    };
    obtenerReportes();
  }, []);
  return (
    <div className="grid place-items-center">
      <h1 className="text-sky-600 text-4xl font-semibold mt-5">
        Panel de Administrador
      </h1>
      <nav className="flex items-center justify-between flex-wrap mt-5">
        <div>
          <NavLink to="crear-usuario" title="Crear usuario">
            <FaUserPlus className="icon" />
            Crear usuario
          </NavLink>
          <NavLink to="editar-usuario" title="Editar usuario">
            <FaUserEdit className="icon" />
            Editar usuario
          </NavLink>
          <NavLink to="eliminar-usuario" title="Eliminar usuario">
            <FaUserMinus className="icon" />
            Eliminar usuario
          </NavLink>
        </div>
      </nav>
      <nav className="flex items-center justify-between flex-wrap mt-5">
        <div>
          <NavLink to="crear-encuesta" title="Crear encuesta">
            <BsFillBookmarkCheckFill className="icon" />
            Crear encuestas
          </NavLink>
        </div>
      </nav>
      <div className="flex">
        <div className="mt-8 ml-10">
          <h2 className="text-sky-600 text-2xl font-semibold mb-4">
            Encuestas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {encuestas.map((encuesta) => (
              <EncuestasCards key={encuesta._id} encuesta={encuesta} />
            ))}
          </div>
        </div>

        <div className="mt-8 ml-10">
          <h2 className="text-sky-600 text-2xl font-semibold mb-4">Reportes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.isArray(reportes) ? (
              reportes.map((reporte) => (
                <ReportesNoRevCards key={reporte.id} reporte={reporte} />
              ))
            ) : (
              <p>No hay reportes disponibles</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const NavLink = ({ to, title, children }) => {
  return (
    <Link
      to={to}
      className="link-style inline-block text-sm px-4 py-2 leading-none border rounded font-semibold bg-sky-500 text-white border-white hover:border-transparent hover:text-white hover:bg-sky-700 mt-4 ml-2 lg:mt-0"
      title={title}
    >
      {children}
    </Link>
  );
};

export default Panel;
