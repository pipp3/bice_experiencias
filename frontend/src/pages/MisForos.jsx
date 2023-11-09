import clientAxios from "../config/ClientAxios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ForoCard from "../components/ForosCards";
const MisForos = () => {
  const [foros, setForos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const forosPerPage = 5;

  useEffect(() => {
    const fetchForos = async () => {
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
      try {
        const response = await clientAxios.get("/foros/mis_foros", config);
        setForos(response.data); // Los foros recuperados del servidor
      } catch (error) {
        console.error("Error al recuperar los foros", error);
      }
    };

    fetchForos();
  }, [currentPage]);

  const indexOfLastForo = currentPage * forosPerPage;
  const indexOfFirstForo = indexOfLastForo - forosPerPage;
  const currentForos = foros.slice(indexOfFirstForo, indexOfLastForo);

  const totalForos = foros.length;
  const totalPaginas = Math.ceil(totalForos / forosPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      {currentForos.map((foro) => (
        <ForoCard key={foro._id} foro={foro} />
      ))}

      <div className="my-5 flex justify-left">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className=" border rounded font-semibold bg-sky-500 text-white border-white hover:border-transparent hover:text-white hover:bg-sky-700 px-4 py-2 mx-2 cursor-pointer"
        >
          Anterior
        </button>
        <span className="text-gray-500 font-semibold text-center">{`Página ${currentPage} de ${totalPaginas}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPaginas}
          className="border rounded font-semibold bg-sky-500 text-white border-white hover:border-transparent hover:text-white hover:bg-sky-700 px-4 py-2 mx-2 cursor-pointer"
        >
          Siguiente
        </button>
        <Link
        to="/perfil/crear-foro"
        className=" px-3 py-2 leading-none border rounded font-semibold bg-sky-700 text-white text-center justify-center border-white hover:border-transparent hover:text-white"
      >
        Crear Foro
      </Link>
      </div>
    </div>
  );
};

export default MisForos;
