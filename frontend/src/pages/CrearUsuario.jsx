import React from 'react'
import { Link } from 'react-router-dom'

const CrearUsuario = () => {
  return (
    <div className="container mx-auto mt-5 md:mt-3 p-5 md:flex md:justify-center">
        <div className="md:3/5 lg:w-2/5 bg-white shadow rounded-md px-10 py-5">
            <h1 className="text-sky-600 font-black text-4xl capitalize mt-3">
            Crea nuevos usuarios !
        </h1>
        <h3 className="text-gray-400 text-xl font-black">
            {" "}
            Registra a los
            <span className="text-sky-500"> a los nuevos empleados</span>
        </h3>

        <form  className="my-5">
            <label
            htmlFor="nombre"
            className=" font-bold uppercase block text-xl text-gray-600"
            >
            Nombre Completo
            </label>
            <input
            id="nombre"
            type="text"
            placeholder="Nombre Completo"
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
            placeholder="Email Laboral"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-200 cursor-pointer"
            />
            <label
            htmlFor="password"
            className=" font-bold uppercase block text-xl text-gray-600 mt-3"
            >
            Contraseña por Defecto
            </label>
            <input
            id="password"
            type="password"
            placeholder="Contraseña por Defecto"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-200 cursor-pointer"
            />
            <label
            htmlFor="area"
            className=" font-bold uppercase block text-xl text-gray-600 mt-3"
            >
            Area
            </label>
            <input
            id="area"
            type="number"
            min="1"
            max="10"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-200 cursor-pointer"
            />

            <input
            type="submit"
            value="Crear Usuario"
            className="bg-sky-700 text-white w-full py-3 mt-5 font-bold rounded-md uppercase hover:cursor-pointer hover:bg-sky-900 transition-colors"
            />
        </form>
        </div>
    </div>
  )
}

export default CrearUsuario