/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext)
}
export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const checkedLoggedIn = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/auth/check");
        const data = await res.json();
        console.log(data.user)
        setAuthUser(data.user);
      } catch (error) {
        toast.error(error.message);
      }
      finally{
        setLoading(false)
      }
    };
    checkedLoggedIn();
  }, []);
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
