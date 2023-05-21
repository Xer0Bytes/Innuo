const getExp = () => {
    return JSON.parse(localStorage.getItem("exp"));
  };
  
  export default getExp;