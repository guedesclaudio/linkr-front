import { createContext, useState } from "react";

const UserContext = createContext();

const UserStorage = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);
  const [followedPosts, setFollowedPosts] = useState([]);
  const [message, setMessage] = useState("Loading...");
  const [userId, setUserId] = useState();
  const [postEdition, setPostEdition] = useState(false);
  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        posts,
        setPosts,
        followedPosts,
        setFollowedPosts,
        message,
        setMessage,
        userId,
        setUserId,
        postEdition,
        setPostEdition,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserStorage };
