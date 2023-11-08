
import React, { useState } from "react";
import { Link } from "react-router-dom";

const MisForos = () => {
  return (
    <div>
      <Link
        to="/perfil/crear-foro"
        className="inline-block text-sm px-4 py-2 leading-none border rounded font-semibold bg-sky-500 text-white border-white hover:border-transparent hover:text-white hover:bg-sky-700 mt-4 lg:mt-0"
      >
        Crear Foro
      </Link>
    </div>
  );
};

export default MisForos;
