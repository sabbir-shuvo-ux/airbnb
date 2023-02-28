import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/profile`)
        .then(({ data }) => {
          setUser(data);
          setReady(true);
        })
        .catch((err) => {
          setReady(false);
          console.log(err);
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready, setReady }}>
      {children}
    </UserContext.Provider>
  );
};

export const GlobalUserContext = () => {
  return useContext(UserContext);
};
