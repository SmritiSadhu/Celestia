// // import React, { useEffect, useState } from "react";
// // //import GenerateAnswer from "./GenerateAnswer";
// // import axios from "axios";

// // function PromptBox({ selectedRole }) {
// //   console.log(selectedRole,'---selected role---')
// //   const [formData, setFormData] = useState({
// //     message: "",
// //   });
// //   const [errorMessage, setErrorMessage] = useState("");
// //   const [questions, setQuestions] = useState([]);
// //   useEffect(() => {
// //     if (selectedRole && selectedRole.role !== "Custom Role") {
// //       const template = `${
// //         selectedRole.roleSummary
// //       }\n\nResponsibilities:\n${selectedRole.responsibilities.join(
// //         "\n"
// //       )}\n\nRequirements:\n${selectedRole.requirements.join("\n")}`;
// //       setFormData({message:template});
// //     } else {
// //       setFormData({ message: "" });
// //     }
// //   }, [selectedRole]);

// //   console.log('form data', formData.message)
// //   function handleChange(event) {
// //     const { name, value } = event.target;
// //     setFormData((prevData) => ({ ...prevData, [name]: value }));
// //   }
// //   const handleSubmit = async (event) => {
// //     event.preventDefault();
// //     // Log all form data together 
// //     if (!formData.message.trim()) {
// //       setErrorMessage("Please describe the role, the field cannot be blank");
// //       return;
// //     }
// //     setErrorMessage("");
// //     getQuestionnaire();
// //   }

// //   const getQuestionnaire = async () => {
// //     try {
// //       const response = await axios.post('http://localhost:8080/api/questionnaire/genaiquestion', {
// //         role: formData.message,
// //       });
// //       console.log(response)
// //       const data = response.data;
// //       console.log(response.data,'questionnaire data')
// //       setQuestions(data)
// //     } catch (error) {
// //       console.error("Error generating questions:", error);
// //       setErrorMessage("Failed to generate questions. Please try again.");
// //     }
// //   }


// //   console.log(questions)
// //   return (
// //     <>
// //       <form onSubmit={handleSubmit}>
// //         {errorMessage && (
// //           <p className="text-red-700 text-center font-semibold my-6">
// //             {errorMessage}
// //           </p>
// //         )}
// //         <textarea
// //           id="message"
// //           name="message"
// //           value={formData.message}
// //           className="border rounded-lg p-3 my-6 shadow-sm focus:outline-sky-300"
// //           placeholder="Select a job role or paste you own description here"
// //           rows={15}
// //           cols={90}
// //           onChange={handleChange}
// //         />

// //         <br />
// //         <div className="flex justify-center">
// //           <button
// //             type="submit"
// //             className="mt-4 bg-cyan-500 py-2 px-3 text-[#ffffff] rounded-md shadow-[inset_0rem_0.2rem_0.4rem_0_rgb(0,0,0,0.2)]"
// //           >
// //             Generate Questions
// //           </button>
// //         </div>
// //       </form>

// //       {/* <GenerateAnswer formData={formData} interviewRounds={interviewRounds} /> */}
// //     </>
// //   );
// // }
// // export default PromptBox;



import React, { useState } from 'react';
import axios from 'axios';

const GenerateInterviewQuestions = ({selectedRole}) => {
  const [role, setRole] = useState('');
  const [interviewData, setInterviewData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const jobRole = selectedRole.role + '-' + selectedRole.roleSummary + selectedRole.requirements + selectedRole.responsibilities;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(jobRole,'---')
      const response = await axios.post('http://localhost:8080/api/questionnaire/genaiquestion', {
        role:jobRole,
      });
      console.log(response.data.data,'my resp---')
      setInterviewData(response.data.data);
      setErrorMessage(null);
    } catch (error) {
      console.error('Error fetching interview questions:', error);
      setErrorMessage('Error generating interview questions.');
    }
  };

  return (
    <div>
      <h1>Generate Interview Questions</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="role">Job Role:</label>
        <input type="text" id="role" value={jobRole} onChange={(e) => setRole(e.target.value)} required />
        <button type="submit" onClick={handleSubmit}>Generate</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {interviewData && (
        
        <div>
          <h2>Interview Questions for {role}</h2>
          {/* Display the interview data here, loop through rounds and questions */}
          {interviewData.map((round) => (
        <div key={round._id}>
          <h3 className='font-bold'>{round.roundName}</h3>
          <ul>
            {round.questions.map((question) => (
              <li key={question._id}>
                <p><strong>Question:</strong> {question.question}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
        </div>
      )}
    </div>
  );
};

export default GenerateInterviewQuestions;
