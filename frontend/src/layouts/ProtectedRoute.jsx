import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";

const ProtectedRoute = () => {
  const { auth } = useAuth();
 
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
