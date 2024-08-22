
const LogOutFunctuon = () => {
  
    console.log("i am being called")
    localStorage.removeItem("sweetHomeUser")
    const checkLogOut = localStorage.getItem("sweetHomeUser")
    if(!checkLogOut)
    {
       window.location.href="/"
    }
    else
    {
        console.log("something went wrong during logout")
    }

        
}

export default LogOutFunctuon
