import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Alert from "../components/Alert";
import clientAxios from "../config/ClientAxios";
import useAuth from "../hooks/useAuth";
import { AuthProvider } from "../context/AuthProvider";

const EditarUsuario = () => {

  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("");
  const [area, setArea] = useState("");
  const [nombre, setNombre] = useState("");
  const [alert, setAlert] = useState({});

  const {setAuth}=useAuth()


  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([email,rol,area,nombre].includes("")) {
      setAlert({
        msg: "Hay uno o mas campos vacios",
        error: true,
      });
      return;
    
    }
    try {
      const {data}=await clientAxios.post('/admin/editar_usuario',{nombre,email,area,rol})
      setAlert({msg:"Usuario Editado Correctamente" , error :false})
      
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
            Edita usuarios !
        </h1>
        <h3 className="text-gray-400 text-xl font-black">
            {" "}
            Modifica a los
            <span className="text-sky-500"> empleados</span>
        </h3>
        {msg && <Alert alert={alert} />}
        <form onSubmit={handleSubmit} className="my-5">
            <label
            htmlFor="nombre"
            className=" font-bold uppercase block text-xl text-gray-600"
            >
            Nombre Completo
            </label>
            <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Laboral"
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
            value={area}
            min="1"
            max="10"
            onChange={(e) => setArea(e.target.value)}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-200 cursor-pointer"
            />
            <label
            htmlFor="rol"
            className=" font-bold uppercase block text-xl text-gray-600"
            >
            Rol
            </label>
            <input
            id="rol"
            type="text"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            placeholder="Rol"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-200 cursor-pointer"
            />
            <input
            type="submit"
            value="Editar Usuario"
            className="bg-sky-700 text-white w-full py-3 mt-5 font-bold rounded-md uppercase hover:cursor-pointer hover:bg-sky-900 transition-colors"
            />
        </form>
        </div>
    </div>
  )
}

export default EditarUsuario