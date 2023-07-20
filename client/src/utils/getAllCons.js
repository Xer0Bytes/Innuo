const getAllCons = () => {
    return JSON.parse(localStorage.getItem("allCons"));
  };
  
  export default getAllCons