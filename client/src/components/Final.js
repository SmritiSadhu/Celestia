import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InterviewRecord from "./Record";
import axios from "axios";
import Loader from "../components/loader"; // Import the Loader component

const Final = () => {
  const location = useLocation();
  const [interviewData, setInterviewData] = useState(location.state || []);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  console.log(interviewData);
  const handleUpdateAnswer = (roundIndex, questionId, answer) => {
    const updatedData = [...interviewData];
    const round = updatedData[roundIndex];
    const question = round.questions.find((q) => q._id === questionId);
    if (question) {
      question.answer = answer;
    }
    setInterviewData(updatedData);
  };

  const handleFinishInterview = async () => {
    // Count the number of filled answers
    let filledAnswersCount = 0;
    interviewData.forEach((round) => {
      round.questions.forEach((question) => {
        if (question.answer && question.answer.trim() !== "") {
          filledAnswersCount += 1;
        }
      });
    });

    // Check if at least two answers are filled
    if (filledAnswersCount < 2) {
      setErrorMessage("Kindly answer at least two questions.");
      return;
    }

    setIsLoading(true); // Start loading
    try {
      const response = await axios.post(
        "http://localhost:8080/api/questionnaire/getfeedback",
        {
          QnA: interviewData,
        }
      );
      console.log(response.data);
      navigate("/analysis", { state: response.data });
    } catch (error) {
      console.log("Error sending feedback", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div>
      {interviewData.map((round, roundIndex) => (
        <div key={round._id} className="my-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-primary">
            {round.roundName}
          </h2>
          {round.questions.map((question, questionIndex) => (
            <div key={question._id} className="mb-4">
              <p className="text-lg">{question.question}</p>
              <InterviewRecord
                questionId={question._id}
                roundIndex={roundIndex}
                roundLength={round.questions.length}
                onAnswerUpdate={handleUpdateAnswer}
              />
            </div>
          ))}
        </div>
      ))}
      {errorMessage && (
        <p className="text-red-700 text-center font-semibold my-6">
          {errorMessage}
        </p>
      )}
      <div className="flex justify-center items-center">
        {isLoading ? (
          <Loader />
        ) : (
          <button
            onClick={handleFinishInterview}
            className="my-4 bg-cyan-500 py-2 px-3 text-[#ffffff] rounded-md shadow-[inset_0rem_0.2rem_0.4rem_0_rgb(0,0,0,0.2)]"
          >
            FINISH INTERVIEW
          </button>
        )}
      </div>
    </div>
  );
};

export default Final;
