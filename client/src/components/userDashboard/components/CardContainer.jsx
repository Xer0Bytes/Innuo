import React from "react";
import Card from "./Card";
import getAllTopics from "../../../utils/getAllTopics";

const CardContainer = () => {
  const allTopics = getAllTopics();
  return (
    <div>
      <div className="text-center text-2xl mb-2 text-[#000] w-full">
        Level up your learning journey!
      </div>
      {allTopics ? (
        <>
          {allTopics.map((topic) => (
            <Card
              key={topic.topicID}
              topic_name={topic.topicTitle}
              modules={topic.modules}
            />
          ))}
        </>
      ) : (
        <>
          <Card topic_name={"There is no topic available yet"} />
        </>
      )}
    </div>
  );
};

export default CardContainer;
