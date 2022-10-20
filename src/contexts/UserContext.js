import { createContext, useState } from "react";

const UserContext = createContext();

const UserStorage = ({ children }) => {
  const [userData, setUserData] = useState({});

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserStorage };
