import React, { createContext, useEffect, useState } from "react";
export const UserContext = createContext();

const PrivateRout = ({ placement, children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const logedInUser = JSON.parse(localStorage.getItem("sweetHomeUser"));
    // console.log(logedInUser);

    if (logedInUser) {
      setUser(logedInUser);
    } else {
      console.error("No user found in localStorage.");
    }
  }, []);

  return (
    <UserContext.Provider value={user}>
      {user ? (
        <>{children}</>
      ) : (
     
          <h1>something went wrong</h1>
       
      )}
    </UserContext.Provider>
  );
};

export default PrivateRout;
