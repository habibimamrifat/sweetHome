import React from 'react'

const UserAvalable = () => {
    const loggedUser = JSON.parse(localStorage.getItem("sweetHomeUser"));
  
    if (!loggedUser) {
      return { message: "noUser", loggedUser};
    }
  
    const message = loggedUser.shopId ? "Baker" : "Customer";
    return { message, loggedUser };
  
}

export default UserAvalable
