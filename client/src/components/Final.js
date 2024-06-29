import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import InterviewRecord from "./Record";
import axios from 'axios';

const Final = () => {
  const location = useLocation();
  const [interviewData, setInterviewData] = useState(location.state || []);
  const [errorMessage, setErrorMessage] = useState(null);

  console.log(interviewData)
  const handleUpdateAnswer = (roundIndex, questionId, answer) => {
    const updatedData = [...interviewData];
    const round = updatedData[roundIndex];
    const question = round.questions.find(q => q._id === questionId);
    if (question) {
      question.answer = answer;
    }
    setInterviewData(updatedData);
  };

  const handleFinishInterview = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/questionnaire/getfeedback', {
        QnA: interviewData,
      });
      console.log(response.data);
    } catch (error) {
      console.log('Error sending feedback', error);
    }
  }

  return (
    <div>
      {interviewData.map((round, roundIndex) => (
        <div key={round._id} className="my-8">
          <h2 className="text-2xl font-bold mb-4">{round.roundName}</h2>
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
        <p className="text-red-700 text-center font-semibold my-6">{errorMessage}</p>
      )}
      <button onClick={handleFinishInterview} className="mt-4 bg-cyan-500 py-2 px-3 text-[#ffffff] rounded-md shadow-[inset_0rem_0.2rem_0.4rem_0_rgb(0,0,0,0.2)]">FINISH INTERVIEW</button>
    </div>
  );
};

export default Final;
