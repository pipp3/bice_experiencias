import clientAxios from "../config/ClientAxios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReportesCards from "../components/ReportesCards";

const MisReportes = () => {
  const [reportes, setReportes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reportesPerPage = 5;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportes = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Cerrando sesión");
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await clientAxios.get("/reportes/mis-reportes", config);
        setReportes(response.data);
      } catch (error) {
        console.error("Error al recuperar los reportes", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReportes();
  }, [currentPage]);

  const indiceUltimoReporte = currentPage * reportesPerPage;
  const indicePrimerReporte = indiceUltimoReporte - reportesPerPage;
  const reportesActuales = reportes.slice(indicePrimerReporte, indiceUltimoReporte);

  const totalReportes = reportes.length;
  const totalPaginas = Math.ceil(totalReportes / reportesPerPage);

  const handlePageChange = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setCurrentPage(nuevaPagina);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          {reportesActuales.map((reporte) => (
            <ReportesCards key={reporte._id} reporte={reporte} />
          ))}

          <div className="my-5 flex justify-left">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="border rounded font-semibold bg-sky-500 text-white border-white hover:border-transparent hover:text-white hover:bg-sky-700 px-4 py-2 mx-2 cursor-pointer"
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
              to="/inicio/reportar"
              className="px-3 py-2 leading-none border rounded font-semibold bg-sky-700 text-white text-center justify-center border-white hover:border-transparent hover:text-white"
            >
              Crear Reporte
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default MisReportes;
