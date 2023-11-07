import { Link } from "react-router-dom";
import { useState } from "react";
import Alert from "../components/Alert";
import axios from "axios";
import clientAxios from "../config/ClientAxios";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || email.length < 6) {
      setAlert({
        msg: "El email es obligatorio",
        error: true,
      });
      return;
    }
    try {
      const { data } = await clientAxios.post(
        `/usuarios/olvide-password`,
        { email }
      );
      setAlert({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alert;

  return (
    <div>
      <h1 className="text-sky-600 font-black text-4xl capitalize mt-3">
        Olvidaste tu contraseña ?
      </h1>
      <h3 className="text-gray-400 text-xl font-black">
        {" "}
        Cambia tu contraseña y
        <span className="text-sky-500"> recupera tu acceso</span>
      </h3>

      {msg && <Alert alert={alert} />}

      <form onSubmit={handleSubmit} className="my-5">
        <label
          className="uppercase font-bold text-gray-600 block text-xl"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="w-full mt-3 p-3 border rounded-xl bg-gray-200 cursor-pointer"
          id="email"
          type="text"
          placeholder="Email Laboral"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className=" bg-sky-700 text-white rounded-md font-bold py-3 mt-5 uppercase w-full hover:cursor-pointer hover:bg-sky-900 transition-colors"
          type="submit"
          value="Enviar instrucciones"
        />
      </form>
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

export default ForgetPassword;
