import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { auth } = useAuth();

  return (
    <header>
      <nav className="flex items-center justify-between flex-wrap bg-gray-200 p-6">
        <div className="flex items-center flex-shrink-0 text-sky-600 mr-6">
          <svg
            className="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg>
          <span className="font-semibold text-4xl tracking-tight">
            Bice Experiencias
          </span>
        </div>

        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link
              to="/inicio"
              className="block mt-4 lg:inline-block lg:mt-0 text-sky-400 font-semibold text-xl hover:text-sky-700 mr-4"
            >
              Inicio
            </Link>
            <Link
              to="encuestas"
              className="block mt-4 lg:inline-block lg:mt-0 text-sky-400 font-semibold text-xl hover:text-sky-700 mr-4"
            >
              Encuestas
            </Link>
            <Link
              to="foros"
              className="block mt-4 lg:inline-block lg:mt-0 text-sky-400 font-semibold text-xl hover:text-sky-700 mr-4"
            >
              Foros
            </Link>
            
          </div>
          <div>
            <h2  className="inline-block text-2xl lg:flex-grow  mt-4 lg:inline-block lg:mt-0 text-sky-400 font-bold mr-5 ">Bienvenido {auth.nombre}</h2>
            <Link className="inline-block text-sm px-4 py-2 leading-none border rounded font-semibold bg-sky-500 text-white border-white hover:border-transparent hover:text-white hover:bg-sky-700 mt-4 lg:mt-0">
              Cerrar Sesion
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
