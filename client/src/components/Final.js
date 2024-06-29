import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import InterviewRecord from "./Record";

const Final = () => {
    const location = useLocation();
//   const [interviewData, setInterviewData] = useState(data);
const [interviewData, setInterviewData] = useState(location.state || []);

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
    </div>
  );
};

export default Final;
