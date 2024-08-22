import React, { createContext, useEffect, useState } from "react";


export const UserContext = createContext();

const PrivateRout = ({ placement, children }) => {
  const [user, setUser] = useState(null);
  const [reload,setReload]=useState(true)

  useEffect(() => {
    const logedInUser = JSON.parse(localStorage.getItem("sweetHomeUser"));
    // console.log(logedInUser);

    if (logedInUser) {
      setUser(logedInUser);
    } else {
      console.error("No user found in localStorage.");
    }
  }, []);

  const ProviderValue= {
    user,reload,setReload
  }

  return (
    <UserContext.Provider value={ProviderValue}>
      {user ? (
        <>{children}</>
      ) : (
     
          <h1>something went wrong</h1>
       
      )}
    </UserContext.Provider>
  );
};

export default PrivateRout;
