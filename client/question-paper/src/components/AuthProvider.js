import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

  const [isAuthenticated, setisAuthenticated] = useState(
    Boolean(localStorage.getItem("token"))
  );

  const signIn = (token) => {
    localStorage.setItem('token', token);
    setisAuthenticated(true);    
  };

  const signOut = (token)=>{
    localStorage.removeItem('token', token)
    setisAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = ()=>{
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
