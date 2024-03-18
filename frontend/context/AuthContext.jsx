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
      try {
        const res = await fetch("/api/auth/check");
        const data = await res.json();
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
