import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import clientAxios from "../config/ClientAxios";
import Alert from "../components/Alert";
import { useNavigate  } from "react-router-dom";

const ResponderEncuesta = () => {
  const [alert, setAlert] = useState({});
  const { id } = useParams();
  const navigateTo = useNavigate();
  const [encuesta, setEncuesta] = useState({});
  const [respuestas, setRespuestas] = useState([]);
  useEffect(() => {
    const fetchEncuestaDetalle = async () => {
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

        // Realizar una solicitud para obtener la encuesta con sus preguntas
        const response = await clientAxios.get(
          `/encuestas/mostrar_encuesta/${id}`,
          config
        );
        setEncuesta(response.data);
      } catch (error) {
        console.error("Error al obtener detalles de la encuesta:", error);
      }
    };

    fetchEncuestaDetalle();
  }, [id]);
  const handleInputChange = (preguntaId, event) => {
    // Verificar si ya hay una respuesta para esta pregunta en el estado
    const respuestaExistenteIndex = respuestas.findIndex(
      (item) => item.idPregunta === preguntaId
    );

    // Actualizar el estado de las respuestas
    if (respuestaExistenteIndex !== -1) {
      // Si ya hay una respuesta, actualizar su valor
      const nuevasRespuestas = [...respuestas];
      nuevasRespuestas[respuestaExistenteIndex].respuesta = event.target.value;
      setRespuestas(nuevasRespuestas);
    } else {
      // Si no hay una respuesta, agregar una nueva
      setRespuestas((prevRespuestas) => [
        ...prevRespuestas,
        { idPregunta: preguntaId, respuesta: event.target.value },
      ]);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar respuestas al servidor
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clientAxios.post(
        `/respuestas/crear_respuesta/${id}`,
        { respuestas },
        config
      );

      // Mostrar alerta de éxito
      setAlert({ type: "success", msg: "Encuesta respondida exitosamente" });
      setTimeout(() => {
        navigateTo('/encuestas')
      }, 3000);
    } catch (error) {
      console.error("Error al enviar respuestas:", error);
      setAlert({ type: "error", msg: "Error al responder la encuesta" });
    }
  };

  const { msg } = alert;
  return (
    <div className="container mx-auto mt-5 md:mt-3 p-5 md:flex md:justify-center">
      <div className="md:3/5 lg:w-2/5 bg-white shadow rounded-md px-10 py-5">
        <h1 className="text-sky-600 font-black text-4xl capitalize mt-3">
          {encuesta.nombre}
        </h1>
        {msg && <Alert alert={alert} />}
        <form onSubmit={handleSubmit} className="my-5">
          <h2 className="text-xl font-semibold mb-2">Preguntas:</h2>
          {encuesta.preguntas &&
            encuesta.preguntas.map((pregunta, index) => (
              <div key={index} className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  {pregunta.nombre}
                </label>

                {pregunta.tipo === "abierta" ? (
                  <textarea
                    value={
                      respuestas.find(
                        (item) => item.idPregunta === pregunta._id
                      )?.respuesta || ""
                    }
                    onChange={(e) => handleInputChange(pregunta._id, e)}
                    className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
                    // Otros atributos necesarios...
                  />
                ) : pregunta.tipo === "satisfaccion" ? (
                  <>
                    {[
                      "Totalmente en desacuerdo",
                      "En desacuerdo",
                      "Me es indiferente",
                      "De acuerdo",
                      "Totalmente de acuerdo",
                    ].map((valor) => (
                      <div key={valor} className="flex items-center">
                        <input
                          type="radio"
                          id={`respuesta${valor}`}
                          name={`pregunta${index}`}
                          value={
                            respuestas.find(
                              (item) => item.idPregunta === pregunta._id
                            )?.respuesta || 1
                          }
                          onChange={(e) => handleInputChange(pregunta._id, e)}
                          // Otros atributos necesarios...
                        />
                        <label htmlFor={`respuesta${valor}`} className="ml-2">
                          {valor}
                        </label>
                      </div>
                    ))}
                  </>
                ) : null}
              </div>
            ))}
          <input
            type="submit"
            value="Enviar Encuesta"
            className="bg-sky-700 text-white w-full py-3 mt-5 font-bold rounded-md uppercase hover:cursor-pointer hover:bg-sky-900 transition-colors"
          />
        </form>
      </div>
    </div>
  );
};

export default ResponderEncuesta;
