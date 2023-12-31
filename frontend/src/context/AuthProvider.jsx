import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/ClientAxios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading,setLoading]=useState(true)

  const navigate = useNavigate();
  
  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setLoading(false)
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const {data} = await clientAxios("/usuarios/perfil", config);
        setAuth(data);
        
        
      } catch (error) {
        setLoading(false)
        setAuth({});
      }
      setLoading(false)
    };

    authUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider };

export default AuthContext;
