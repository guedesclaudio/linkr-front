import { createContext, useState } from "react";

const UserContext = createContext();

const UserStorage = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("Loading...");
  const [userId, setUserId] = useState();

  return (
    <UserContext.Provider value={{ userData, setUserData, posts, setPosts, message, setMessage, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserStorage };
