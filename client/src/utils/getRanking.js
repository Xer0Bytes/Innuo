const getRanking = () => {
    return JSON.parse(localStorage.getItem("ranking"));
  };
  
  export default getRanking