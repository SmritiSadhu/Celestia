import React, { useEffect, useState } from "react";
//import { GoogleGenerativeAI } from "@google/generative-ai";
//import GenerateAnswer from "./GenerateAnswer";
import axios from "axios";

function PromptBox({ selectedRole }) {
  const [formData, setFormData] = useState({
    message: "",
  });
  const [interviewRounds, setInterviewRounds] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }
  async function handleSubmit(event) {
    event.preventDefault();
    // console.log(formData.message); // Log all form data together
    if (!formData.message.trim()) {
      setErrorMessage("Please describe the role, the field cannot be blank");
      return;
    }
  setErrorMessage("");
  }
  

  // const genAI = new GoogleGenerativeAI(
  //   "AIzaSyDEEqeK21RjAnBjByyNbg3CALIbOhDAvOo"
  // );
//   async function run(userprompt) {
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//     const prompt =
//       userprompt +
//       `generate interview questions, as rounds and try to have all possible 
//         rounds that can exist for the given role, like in real life and send them as a JSON object with a 
//         key named "rounds". Each round should have a key named "roundName" with a string value 
//         representing the round name, and another key named "questions" with an array of strings 
//         containing the interview questions for that round. Here's an example of the desired JSON format:
// {
//   "rounds": [
//     {
//       "roundName": "Technical Screening",
//       "questions": [
//         "Explain the concept of React components.",
//         "What is the difference between useState and useEffect hooks?"
//       ]
//     },
//     ...etc
//   ]
// }
// Please generate interview questions and all possible interview rounds following the format mentioned above.
// `;
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     var text = response.text().replace(/```/g, "");
//     text = text.replace(/json/g, "");
//     const parsedData = JSON.parse(text);
//     console.log(parsedData);
//     setInterviewRounds(parsedData.rounds);
//   }

  useEffect(() => {
    if (selectedRole != "Custom Role") {
      const message = selectedRole.template
        .replace(/Role Summary:/, "\n\nRole Summary:")
        .replace(/Responsibilities:/, "\n\nResponsibilities:")
        .replace(/Requirements:/, "\n\nRequirements:")
        .replace(/ - /g, "\n- ");
      setFormData();
      setFormData({message:message});
    }
  }, [selectedRole]);
  return (
    <>
      {interviewRounds.length === 0 ? (
        <form onSubmit={handleSubmit}>
        {errorMessage && (
            <p className="text-red-700 text-center font-semibold my-6">{errorMessage}</p>
          )}
          <textarea
            id="message"
            name="message"
            value={formData.message}
            className="border rounded-lg p-3 my-6 shadow-sm focus:outline-sky-300"
            placeholder="Select a job role or paste you own description here"
            rows={15}
            cols={90}
            onChange={handleChange}
          />

          <br />
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-4 bg-cyan-500 py-2 px-3 text-[#ffffff] rounded-md shadow-[inset_0rem_0.2rem_0.4rem_0_rgb(0,0,0,0.2)]"
            >
              Generate Questions
            </button>
          </div>
        </form>
      ) : (
        <div></div>
        //<GenerateAnswer formData={formData} interviewRounds={interviewRounds} />
      )}
    </>
  );
}
export default PromptBox;
