import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Alert from "../components/Alert";
import clientAxios from "../config/ClientAxios";
import useAuth from "../hooks/useAuth";
import { AuthProvider } from "../context/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});

  const {setAuth}=useAuth()

<<<<<<< HEAD
 
=======

>>>>>>> ba37c3450a41cdca14008b6b8c88d683414a86ca
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    
=======
>>>>>>> ba37c3450a41cdca14008b6b8c88d683414a86ca
    if ([email, password].includes("")) {
      setAlert({
        msg: "Hay uno o mas campos vacios",
        error: true,
      });
      return;
<<<<<<< HEAD
      
    }
    try {
      
      const token = localStorage.getItem("token");
      if (!token){
        console.log("Cerrando sesion")
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };


      const {data}=await clientAxios.post('/usuarios/',{email,password},config)
      setAlert({})
      localStorage.setItem('token',data.token)
      setAuth(data)
      navigate('/inicio')
=======
    
    }
    try {
      const {data}=await clientAxios.post('/usuarios/',{email,password})
      setAlert({})
      localStorage.setItem('token',data.token)
      setAuth(data)
      navigate("/inicio")
>>>>>>> ba37c3450a41cdca14008b6b8c88d683414a86ca
    } catch (error) {
      setAlert({
        msg:error.response.data.msg,
        error:true
      })
    }
  };

  const { msg } = alert;
  return (
    <div>
      <h1 className="text-sky-600 font-black text-4xl capitalize mt-3">
        Bienvenido de vuelta !
      </h1>
      <h3 className="text-gray-400 text-xl font-black">
        {" "}
        Inicia sesion y mejora tu
        <span className="text-sky-500"> ambiente laboral</span>
      </h3>

      {msg && <Alert alert={alert} />}
      <form onSubmit={handleSubmit} className="my-5">
        <label
          htmlFor="email"
          className=" font-bold uppercase block text-xl text-gray-600"
        >
          Email
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
          htmlFor="password"
          className=" font-bold uppercase block text-xl text-gray-600 mt-3"
        >
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="w-full mt-3 p-3 border rounded-xl bg-gray-200 cursor-pointer"
        />

        <input
          type="submit"
          value="Iniciar Sesion"
          className="bg-sky-700 text-white w-full py-3 mt-5 font-bold rounded-md uppercase hover:cursor-pointer hover:bg-sky-900 transition-colors"
        />
      </form>
      <nav>
        <Link
          className="hover:underline block text-center my-5 text-slate-500 font-semibold uppercase text-sm"
          to="forget-password"
        >
          Cambia tu Contraseña
        </Link>
      </nav>
    </div>
  );
};

export default Login;
