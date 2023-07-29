import getCurrentUser from "../../../utils/getCurrentUser";

function AchievementProgressBar({ requiredExp }) {
  const currentUser = getCurrentUser();
  const width = (currentUser.experiencePoints / requiredExp) * 100;
  //   const barBgColor = currentUser.isContributer? "#FFC6CD" :"#B7EDDF"
  const textColor = currentUser.isContributer ? "pink-500" : "[#9bd71a]";
  const barBgColor = "gray-200";
  const progressBgColor = currentUser.isContributer ? "#FA9BAF" : "#9bd71a";
  return (
    <>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span
              className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-${textColor} `}
            >
              Progress
            </span>
          </div>
          <div className="text-right">
            <span className={`text-xs font-semibold inline-block text-[#333] `}>
              {currentUser.experiencePoints}/{requiredExp} EXP
            </span>
          </div>
        </div>
        <div
          className={`overflow-hidden h-2 mb-4 text-xs flex rounded bg-${barBgColor}`}
        >
          <div
            style={{ width: `${width}%` }}
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[${progressBgColor}]`}
          ></div>
        </div>
      </div>
    </>
  );
}

export default AchievementProgressBar;
