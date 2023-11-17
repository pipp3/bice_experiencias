import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from "../hooks/useAuth";

const MenuDesplegable = () => {
    const { auth } = useAuth();
    const [menuVisible, setMenuVisible] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem("token");
      };
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
      };


  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="bg-blue-600 text-white px-6 py-2 rounded focus:outline-none focus:shadow-outline"
      >
        Menú
      </button>
      {menuVisible && (
        <div className="absolute right-0 w-48 mt-2 bg-white border rounded shadow-lg">
          <Link
            to="/perfil/mis-foros"
            className="block px-2 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            Mis foros
          </Link>
          {auth.rol === 'admin' ? (
            <Link
              to="/panel"
              className="block px-2 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
            >
              Admin Panel
            </Link>
          ) : (
            <Link
              to="/perfil/mis-reportes"
              className="block px-2 py-2 w-full text-gray-800 hover:bg-blue-500 hover:text-white"
            >
              Mis Reportes
            </Link>
          )}
          <Link
            to="/"
            onClick={handleLogout}
            className="block px-2 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            Cerrar Sesión
          </Link>
        </div>
      )}
    </div>
  )
}

export default MenuDesplegable