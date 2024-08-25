
const LogInCeck = async (apiLink, logInInfo) => {
  // console.log("blie", apiLink,logInInfo)

  const { email, password } = logInInfo;

  // console.log("private rout", apiLink,email,password)

  try {
    const request = await fetch(`${apiLink}/${email}/${password}`);
    const result = await request.json();
    // console.log("log in check",result)
    return result
  } 
  catch (error) {
    return error;
  }
};

export default LogInCeck;
