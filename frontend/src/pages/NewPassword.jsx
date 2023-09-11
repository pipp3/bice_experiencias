import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Alert from "../components/Alert";
import axios from "axios";
import clientAxios from "../config/ClientAxios";


const NewPassword = () => {
  const params = useParams();
  const { token } = params;
  const [tokenValid, setTokenValid] = useState(false);
  const [alert, setAlert] = useState({});
  const [password, setPassword] = useState("");
  const [repeat_password, setRepeatPassword] = useState("");
  
  useEffect(() => {
    const checkToken = async () => {
      try {
        await clientAxios.get(
          `/usuarios/olvide-password/${token}`
        );
        setTokenValid(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    checkToken();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6 || repeat_password.length < 6) {
      setAlert({
        msg: "La contraseña debe tener minimo 6 caracteres",
        error: true,
      });
      return
    }
    if(password!==repeat_password){
      setAlert({
        msg: "Las contraseñas deben ser iguales",
        error: true,
      });
      return
    }
    try {
      const url=`/usuarios/olvide-password/${token}`
      const {data}=await clientAxios.post(url,{password})
      setAlert({
        msg:data.msg,
        error:false
      })
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
        Cambia tu contraseña
      </h1>
      <h3 className="text-gray-400 text-xl font-black">
        {" "}
        No pierdas acceso
        <span className="text-sky-500"> a tu cuenta</span>
      </h3>
      {msg && <Alert alert={alert} />}
      {tokenValid && (
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="password"
            className=" font-bold uppercase block text-xl text-gray-600 mt-3"
          >
            Nueva Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Nueva Contraseña"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-200 cursor-pointer"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            htmlFor="repeat_password"
            className=" font-bold uppercase block text-xl text-gray-600 mt-3"
          >
            Repite Tu nueva Contraseña
          </label>
          <input
            id="repeat_password"
            type="password"
            placeholder="Repite tu nueva Contraseña"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-200 cursor-pointer"
            value={repeat_password}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <input
            className=" bg-sky-700 text-white rounded-md font-bold py-3 mt-5 uppercase w-full hover:cursor-pointer hover:bg-sky-900 transition-colors"
            type="submit"
            value="Cambiar contraseña"
  
          />
        </form>
      )}

      <nav>
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 uppercase font-semibold hover:underline text-sm"
        >
          Inicia sesion aqui
        </Link>
      </nav>
    </div>
  );
};

export default NewPassword;
