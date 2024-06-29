import React from "react";
import InterviewRecord from "./InterviewRecord";
import { Route, Router, Routes } from "react-router-dom";

const GeneratedQuestions = ({ interviewRounds, formData }) => {
  return (
    <div className="flex justify-center">
      {/* <h2>Interview Rounds - {formData.message} role</h2> */}
      <div className="bg-white border rounded-lg shadow-lg my-3">
        {interviewRounds.map((round) => (
          <div key={round.roundName}>
            <h2 className="border border-cyan-500 font-medium text-xs rounded-full p-2 inline text-cyan-500 my-6">{round.roundName}</h2>
            <div className="m-4">
              <ul>
                {round.questions.map((question, index) => (
                  <li className="font-bold text-2xl text-center" key={index}>{question}</li>
                ))}
              </ul>
            </div>
            <InterviewRecord />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneratedQuestions;
