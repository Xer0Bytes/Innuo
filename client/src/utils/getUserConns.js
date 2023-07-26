const getUserConns = () => {
    return JSON.parse(localStorage.getItem("userConns"));
  };
  
  export default getUserConns