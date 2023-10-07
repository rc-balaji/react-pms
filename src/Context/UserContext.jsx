import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userTask, setUserTask] = useState([]);
  const [project, setProject] = useState([]);

  return (
    <UserContext.Provider
      value={{ user, setUser, userTask, setUserTask, project, setProject }}
    >
      {children}
    </UserContext.Provider>
  );
}
