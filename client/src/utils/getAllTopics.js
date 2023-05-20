const getAllTopics = () => {
    return JSON.parse(localStorage.getItem("allTopics"));
  };
  
  export default getAllTopics