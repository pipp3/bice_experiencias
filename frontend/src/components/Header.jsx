import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import MenuDesplegable from "./MenuDesplegable";

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
              to="foro"
              className="block mt-4 lg:inline-block lg:mt-0 text-sky-400 font-semibold text-xl hover:text-sky-700 mr-4"
            >
              Foros
            </Link>
            <Link
              to="reportar"
              className="block mt-4 lg:inline-block lg:mt-0 text-sky-400 font-semibold text-xl hover:text-sky-700 mr-4"
            >
              Reportar
            </Link>
          </div>

          <h2 className="inline-block text-3xl lg:flex-grow  mt-4 lg:inline-block lg:mt-0 text-sky-800 font-bold mr-5 ">
            Bienvenido
            <p className="text-sky-800 inline-block">&nbsp; {auth.nombre}</p>
          </h2>
          <MenuDesplegable/>
        </div>
      </nav>
    </header>
  );
};

export default Header;
