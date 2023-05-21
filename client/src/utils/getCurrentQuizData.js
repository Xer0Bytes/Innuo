const getCurrentQuizData = () => {
    return JSON.parse(localStorage.getItem("currentQuizData"));
  };
  
  export default getCurrentQuizData