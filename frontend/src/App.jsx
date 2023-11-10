import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./layouts/ProtectedRoute";

import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import NewPassword from "./pages/NewPassword";
import Inicio from "./pages/Inicio";
import Encuestas from "./pages/Encuestas";
import Panel from "./pages/Panel";
import Reportar from "./pages/Reportar";
import Foro from "./pages/Foro";
import EditarForo from "./pages/EditarForo";

import CrearUsuario from "./pages/CrearUsuario";
import EditarUsuario from "./pages/EditarUsuario";
import EliminarUsuario from "./pages/EliminarUsuario";

import CrearForo from "./pages/CrearForo";
import Perfil from "./pages/Perfil";
import MisForos from "./pages/MisForos";

import { AuthProvider } from "./context/AuthProvider";



function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="forget-password" element={<ForgetPassword />} />
              <Route path="new-password/:token" element={<NewPassword />} />
            </Route>

            <Route path="/inicio" element={<ProtectedRoute/>}>
              <Route index element={<Inicio/>}/>
              <Route path="encuestas" element={<Encuestas/>}/>
              <Route path="reportar" element={<Reportar/>}/>
              <Route path="foro" element={<Foro/>}/>
            </Route>

            <Route path="/perfil" element={<ProtectedRoute/>}>
              <Route index element={<Perfil/>}/>
              <Route path="mis-foros" element={<MisForos/>}/>
              <Route path="crear-foro" element={<CrearForo/>}/>
              <Route path="editar-foro/:id" element={<EditarForo/>}/>
            </Route>

            <Route path="/panel" element={<ProtectedRoute/>}>
              <Route index element={<Panel/>}/>
              <Route path="crear-usuario" element={<CrearUsuario/>}/>
              <Route path="editar-usuario" element={<EditarUsuario/>}/>
              <Route path="eliminar-usuario" element={<EliminarUsuario/>}/>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
