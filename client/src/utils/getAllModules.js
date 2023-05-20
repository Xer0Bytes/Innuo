const getAllModules = () => {
    return JSON.parse(localStorage.getItem("allModules"));
  };
  
  export default getAllModules