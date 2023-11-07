import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";

const ProtectedRoute = () => {
<<<<<<< HEAD

  const { auth,loading  } = useAuth();
  if (loading) return 'Cargando...'
=======
  const { auth } = useAuth();
 
>>>>>>> ba37c3450a41cdca14008b6b8c88d683414a86ca
  return(
    <div>
      
       {auth._id ? (
        <div className="bg-gray-100">
          <Header/>
          <div className="md:min-h-screen">
            <main>
             <Outlet/>
            </main>
            
          </div>
        </div>
       )
       :<Navigate to="/"/> }
      
    </div>
  ) 
};

export default ProtectedRoute;
