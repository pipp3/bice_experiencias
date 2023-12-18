import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FadeLoader } from "react-spinners";

const ProtectedRoute = () => {
  const { auth, loading } = useAuth();
  if (loading)
    return (
      <div className="content-center">
        <FadeLoader color="#36d7b7" size={150} />
      </div>
    );
  return (
    <div>
      {auth._id ? (
        <div className="bg-gray-100">
          <Header />
          <div className="md:min-h-screen">
            <main>
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
      <Footer/>
    </div>
  );
};

export default ProtectedRoute;
