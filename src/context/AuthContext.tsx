import React, { createContext, useEffect, useState, ReactNode } from "react";
import UserData from "../data/user";

interface AuthContextType {
  currentUser: UserData | null;
  updateUser: (data: UserData | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  updateUser: () => {},
});

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const updateUser = (data: UserData | null) => {
    setCurrentUser(data);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, updateUser: setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
