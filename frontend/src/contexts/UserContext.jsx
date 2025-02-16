import  { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Store the currently selected menu item, any shared data, and user info
  const [selectedMenuItem, setSelectedMenuItem] = useState('/dashboard');
  const [sharedData, setSharedData] = useState(null);
  const [user, setUser] = useState(null); // e.g. { name, email, ... }

  const value = {
    selectedMenuItem,
    setSelectedMenuItem,
    sharedData,
    setSharedData,
    user,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};
