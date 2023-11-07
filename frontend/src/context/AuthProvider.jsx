import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/ClientAxios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
<<<<<<< HEAD
  const [loading,setLoading]=useState(true)
=======
  const [loading, setLoading] = useState(true);
>>>>>>> ba37c3450a41cdca14008b6b8c88d683414a86ca

  const navigate = useNavigate();
  
  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
<<<<<<< HEAD
        setLoading(false)
=======
        setLoading(false);
>>>>>>> ba37c3450a41cdca14008b6b8c88d683414a86ca
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
<<<<<<< HEAD
        const {data} = await clientAxios("/usuarios/perfil", config);
        setAuth(data);
        navigate('/inicio')
        
      } catch (error) {
        setLoading(false)
        setAuth({});
      }
      setLoading(false)
=======
        const data = await clientAxios("/usuarios/perfil", config);
        setAuth(data);
        
      } catch (error) {
        setAuth({});
      } finally {
        setLoading(false);
      }
>>>>>>> ba37c3450a41cdca14008b6b8c88d683414a86ca
    };

    authUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
<<<<<<< HEAD
        loading
=======
        loading,
>>>>>>> ba37c3450a41cdca14008b6b8c88d683414a86ca
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider };

export default AuthContext;
