<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Alert from "../components/Alert";
import clientAxios from "../config/ClientAxios";
import useAuth from "../hooks/useAuth";
import { AuthProvider } from "../context/AuthProvider";

const EliminarUsuario = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});
  const {setAuth}=useAuth()

  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([email].includes("")) {
      setAlert({
        msg: "Ingrese un email a eliminar",
        error: true,
      });
      return;
    
    }
    try {
      const {data}=await clientAxios.post('/admin/eliminar_usuario',{email})
      setAlert({msg:"Usuario Eliminado Correctamente" , error :false})
      navigate("/panel")
    } catch (error) {
      setAlert({
        msg:error.response.data.msg,
        error:true
      })
    }
  };
  const { msg } = alert;
=======
import React from 'react'

const EliminarUsuario = () => {
>>>>>>> ba37c3450a41cdca14008b6b8c88d683414a86ca
  return (
    <div className="container mx-auto mt-5 md:mt-3 p-5 md:flex md:justify-center">
        <div className="md:3/5 lg:w-2/5 bg-white shadow rounded-md px-10 py-5">
            <h1 className="text-sky-600 font-black text-4xl capitalize mt-3">
            Elimina usuarios !
        </h1>
        <h3 className="text-gray-400 text-xl font-black">
            {" "}
            Borra a los
            <span className="text-sky-500"> empleados obsoletos</span>
        </h3>
<<<<<<< HEAD
        {msg && <Alert alert={alert} />}
        <form onSubmit={handleSubmit} className="my-5">
=======

        <form  className="my-5">
>>>>>>> ba37c3450a41cdca14008b6b8c88d683414a86ca
            <label
            htmlFor="email"
            className=" font-bold uppercase block text-xl text-gray-600 mt-3"
            >
            Email Laboral
            </label>
            <input
            id="email"
            type="email"
<<<<<<< HEAD
            value={email}
            onChange={(e) => setEmail(e.target.value)}
=======
>>>>>>> ba37c3450a41cdca14008b6b8c88d683414a86ca
            placeholder="Email Laboral"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-200 cursor-pointer"
            />
            
            <input
            type="submit"
            value="Eliminar Usuario"
            className="bg-sky-700 text-white w-full py-3 mt-5 font-bold rounded-md uppercase hover:cursor-pointer hover:bg-sky-900 transition-colors"
            />
        </form>
        </div>
    </div>
  )
}

export default EliminarUsuario