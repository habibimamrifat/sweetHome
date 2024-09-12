import React, { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

const PrivateRout = ({ placement, children }) => {
  const [user, setUser] = useState(null);
  const [reload, setReload] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const logedInUser = JSON.parse(localStorage.getItem("sweetHomeUser"));
    // console.log(logedInUser);

    if (logedInUser) {
      setUser(logedInUser);
    } else {
      // console.error("No user found in localStorage.");
      alert("no user Found please lig in or sign up")
      navigate("/")
    }
  }, []);

  const ProviderValue = useMemo(() => ({
    user,
    reload,
    setReload,
  }), [user, reload]);;

  return (
    <UserContext.Provider value={ProviderValue}>
      {ProviderValue.user ? <>{children}</> : <h1>something went wrong</h1>}
    </UserContext.Provider>
  );
};

export default PrivateRout;
