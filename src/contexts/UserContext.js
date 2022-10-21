import { createContext, useState } from "react";

const UserContext = createContext();

const UserStorage = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);

  return (
    <UserContext.Provider value={{ userData, setUserData, posts, setPosts }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserStorage };
