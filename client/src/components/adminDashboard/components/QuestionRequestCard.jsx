import { React, useState } from "react";
import InputField from "./InputField";
import PopUp from "../../lessonStructure/components/PopUp";
import FileInput from "./FileInput";
import FileViewer from "./FileViewer";
import { FiChevronsDown, FiChevronsUp } from "react-icons/fi";
import newRequest from "../../../utils/newRequest";

const QuestionRequestCard = ({ id, data, status, statusColor }) => {
  const [formData, setFormData] = useState({
    //dont worry this is just all the form value ;)
    questionText: data.questionText,
    choice1Text: data.choice1Text,
    choice2Text: data.choice2Text,
    choice3Text: data.choice3Text,
    choice4Text: data.choice4Text,
    correctChoice: 3,
    questionImage: data.questionImageURL,
    choice1Image: data.choice1ImageURL,
    choice2Image: data.choice2ImageURL,
    choice3Image: data.choice3ImageURL,
    choice4Image: data.choice4ImageURL,
  });

  const [inputDisabled, setInputDisabled] = useState(true);
  const [visibleRejectModal, setVisibleRejectModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const buttonClass =
    "inline-flex items-center px-5 py-1.5 border-[2px] border-[#333] outline-none rounded-[45px] text-[#333] uppercase text-md font-semibold cursor-pointer transition-all duration-500 ease-in-out transform hover:-translate-y-[5px] mr-2 mb-2 hover:border-b-[10px]";

  //reset button function
  const resetQuestionInfo = () => {
    setFormData({
      questionText: "This is question text",
      choice1Text: "This is choice 1",
      choice2Text: "This is choice 2",
      choice3Text: "This is choice 3",
      choice4Text: "This is choice 4",
      correctChoice: 3,
      questionImage:
        "https://res.cloudinary.com/dgcmjva7h/image/upload/v1687366183/Innuo/bz98pbdmgdznm34ilvcr.gif",
      choice1Image:
        "https://res.cloudinary.com/dgcmjva7h/image/upload/v1687360075/Innuo/azla43ycvmqjep1xpt02.gif",
      choice2Image:
        "https://res.cloudinary.com/dgcmjva7h/image/upload/v1687360019/Innuo/oncayyjqubmwmjrl3b8f.gif",
      choice3Image:
        "https://res.cloudinary.com/dgcmjva7h/image/upload/v1687354107/Innuo/igvuftrqbwfeir7mqvxr.gif",
      choice4Image:
        "https://res.cloudinary.com/dgcmjva7h/image/upload/v1684698784/Innuo/yzukpraradn1rzbwg38m.gif",
    });

    document.getElementById("questionImageFile").value = "";
    document.getElementById("choice1ImageFile").value = "";
    document.getElementById("choice2ImageFile").value = "";
    document.getElementById("choice3ImageFile").value = "";
    document.getElementById("choice4ImageFile").value = "";
  };

  const config_header = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const handleApprove = async (e) => {
    e.preventDefault();
    setInputDisabled(true);
    console.log("success");

    try {
      const res = await newRequest.post(
        `/admin/approve/${id}`,
        {
          type: "question",
          data: {
            topicID: data.topicID,
            topicTitle: data.topicTitle,
            moduleID: data.moduleID,
            moduleTitle: data.moduleTitle,
            questionText: formData.questionText,
            choice1Text: formData.choice1Text,
            choice2Text: formData.choice2Text,
            choice3Text: formData.choice3Text,
            choice4Text: formData.choice4Text,
            correctChoice: formData.correctChoice,
            questionImageURL: formData.questionImage,
            choice1ImageURL: formData.choice1Image,
            choice2ImageURL: formData.choice2Image,
            choice3ImageURL: formData.choice3Image,
            choice4ImageURL: formData.choice4Image,
          },
          status: status,
        },
        config_header
      );

      localStorage.setItem("allCons", JSON.stringify(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = async () => {
    setInputDisabled(true);
    setVisibleRejectModal(false);
    console.log("success");

    try {
      const res = await newRequest.post(`/admin/reject/${id}`, config_header);

      localStorage.setItem("allCons", JSON.stringify(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mb-6 lg:ml-0  text-gray-900 ">
      <div className="cursor-default p-3 border border-gray-200 rounded-xl shadow shadow-lg">
        {visibleRejectModal && (
          <PopUp
            message={
              "Are you sure you want to reject this request? This will result in the topic not being added to the database!"
            }
            redButtonText={"Confirm"}
            normalButtonText={"No, take me back"}
            normalButtonFunction={() => setVisibleRejectModal(false)}
            redButtonFunction={() => handleReject()}
            setModalVisibility={setVisibleRejectModal}
          />
        )}
        <h5 className="mb-1 text-2xl inline-block w-full font-bold tracking-tight text-[#41CDDA] ">
          Request to add a question{" "}
          <span
            className={`px-2 text-lg text-white ml-1 bg-${statusColor} uppercase rounded-lg font-normal`}
          >
            {status}
          </span>
          {expanded ? (
            <FiChevronsUp
              onClick={() => setExpanded(false)}
              className="float-right cursor-pointer"
            />
          ) : (
            <FiChevronsDown
              onClick={() => setExpanded(true)}
              className="float-right cursor-pointer"
            />
          )}
        </h5>
        <h5 className="mb-1 text-sm font-normal tracking-tight text-gray-900 ">
          User: Contributor#3
        </h5>
        <h2 className="text-lg tracking-tight">Topic: {data.topicTitle}</h2>
        <h2 className="text-lg tracking-tight">
          Module Title: {data.moduleTitle}
        </h2>

        {expanded && (
          <>
            <h2 className="text-xl font-bold tracking-tight mt-2">Question</h2>
            {/* subcard start  */}
            <div
              className={`px-2 py-1 border rounded-lg shadow w-full m-auto items-center`}
            >
              <InputField
                value={formData.questionText}
                setValue={(value) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    questionText: value,
                  }))
                }
                inputDisabled={inputDisabled}
              />

              <FileViewer file={formData.questionImage} />

              {!inputDisabled && (
                <>
                  <div className="text-center">Question image</div>
                  <FileInput
                    ogFile={formData.questionImage}
                    setFile={(value) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        questionImage: value,
                      }))
                    }
                    id={"questionImageFile"}
                  />
                </>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-3">
              <div className="border border-2 border-gray-200 rounded-lg m-2 p-2">
                <span className="font-bold text-lg">1</span>
                <FileViewer file={formData.choice1Image} />
                {!inputDisabled && (
                  <>
                    <div className="text-center">Choice 1 image</div>
                    <FileInput
                      ogFile={formData.choice1Image}
                      setFile={(value) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          choice1Image: value,
                        }))
                      }
                      id={"choice1ImageFile"}
                    />
                  </>
                )}{" "}
                <div className="mt-2">
                  <InputField
                    value={formData.choice1Text}
                    setValue={(value) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        choice1Text: value,
                      }))
                    }
                    inputDisabled={inputDisabled}
                  />
                </div>
              </div>
              <div className="border border-2 border-gray-200 rounded-lg m-2 p-2">
                <span className="font-bold text-lg">2</span>
                <FileViewer file={formData.choice2Image} />
                {!inputDisabled && (
                  <>
                    <div className="text-center">Choice 2 image</div>
                    <FileInput
                      ogFile={formData.choice1Image}
                      setFile={(value) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          choice2Image: value,
                        }))
                      }
                      id={"choice2ImageFile"}
                    />
                  </>
                )}
                <div className="mt-2">
                  <InputField
                    value={formData.choice2Text}
                    setValue={(value) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        choice2Text: value,
                      }))
                    }
                    inputDisabled={inputDisabled}
                  />
                </div>
              </div>
              <div className="border border-2 border-gray-200 rounded-lg m-2 p-2">
                <span className="font-bold text-lg">3</span>
                <FileViewer file={formData.choice3Image} />
                {!inputDisabled && (
                  <>
                    <div className="text-center">Choice 3 image</div>
                    <FileInput
                      ogFile={formData.choice3Image}
                      setFile={(value) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          choice3Image: value,
                        }))
                      }
                      id={"choice3ImageFile"}
                    />
                  </>
                )}{" "}
                <div className="mt-2">
                  <InputField
                    value={formData.choice3Text}
                    setValue={(value) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        choice3Text: value,
                      }))
                    }
                    inputDisabled={inputDisabled}
                  />
                </div>
              </div>
              <div className="border border-2 border-gray-200 rounded-lg m-2 p-2">
                <span className="font-bold text-lg">4</span>
                <FileViewer file={formData.choice4Image} />
                {!inputDisabled && (
                  <>
                    <div className="text-center">Choice 4 image</div>
                    <FileInput
                      ogFile={formData.choice4Image}
                      setFile={(value) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          choice4Image: value,
                        }))
                      }
                      id={"choice4ImageFile"}
                    />
                  </>
                )}
                <div className="mt-2">
                  <InputField
                    value={formData.choice4Text}
                    setValue={(value) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        choice4Text: value,
                      }))
                    }
                    inputDisabled={inputDisabled}
                  />
                </div>
              </div>
            </div>
            <div className="m-2">
              <h2 className="text-lg font-semibold tracking-tight">
                Correct Choice
              </h2>
              <InputField
                value={formData.correctChoice}
                setValue={(value) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    correctChoice: value,
                  }))
                }
                inputDisabled={inputDisabled}
              />
            </div>

            {!inputDisabled && (
              <div
                onClick={resetQuestionInfo}
                className="cursor-pointer font-bold pl-1.5 underline mt-2"
              >
                Reset
              </div>
            )}
            {/* subcard end  */}
            {status === "pending" && (
              <>
                <hr className="text-gray-900 my-2" />

                <button
                  onClick={(e) => handleApprove(e)}
                  className={`bg-green-300 ${buttonClass}`}
                >
                  Approve
                </button>
                <button
                  onClick={() => setInputDisabled(!inputDisabled)}
                  className={`bg-transparent ${buttonClass}`}
                >
                  {inputDisabled ? "Edit" : "Save Changes"}
                </button>
                <button
                  onClick={() => setVisibleRejectModal(true)}
                  className={`bg-red-300 ${buttonClass}`}
                >
                  Reject
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionRequestCard;
