import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const GenerateInterviewQuestions = ({ selectedRole }) => {
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    message: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (selectedRole && selectedRole.role !== "Custom Role") {
      const template = `${
        selectedRole.roleSummary
      }\n\nResponsibilities:\n${selectedRole.responsibilities.join(
        "\n"
      )}\n\nRequirements:\n${selectedRole.requirements.join("\n")}`;
      setFormData({ message: template });
    } else {
      setFormData({ message: "" });
    }
  }, [selectedRole]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.message.trim()) {
      setErrorMessage("Please describe the role, the field cannot be blank");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/questionnaire/genaiquestion",
        {
          role: formData.message,
        }
      );
     
      setErrorMessage(null);
      navigate("/generate", { state: response.data.data});
    } catch (error) {
      console.error("Error fetching interview questions:", error);
      setErrorMessage("Error generating interview questions.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {errorMessage && (
          <p className="text-red-700 text-center font-semibold my-6">
            {errorMessage}
          </p>
        )}
        <textarea
          type="text"
          id="role"
          value={formData.message}
          placeholder="Select a job role or paste you own description here"
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          required
          className="border rounded-lg p-3 my-6 shadow-sm focus:outline-sky-300"
          rows={15}
          cols={90}
        />
        <div className="flex justify-center">
          
            <button
              type="submit"
              className="mt-4 bg-cyan-500 py-2 px-3 text-[#ffffff] rounded-md shadow-[inset_0rem_0.2rem_0.4rem_0_rgb(0,0,0,0.2)]"
              onClick={handleSubmit}
            >
              Generate Questions
            </button>
       
        </div>
      </form>

      {/* {interviewData && (
        <div>
          <h2>Interview Questions for {role}</h2>
          
          {interviewData.map((round) => (
            <div key={round._id}>
              <h3 className="font-bold">{round.roundName}</h3>
              <ul>
                {round.questions.map((question) => (
                  <li key={question._id}>
                    <p>
                      <strong>Question:</strong> {question.question}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default GenerateInterviewQuestions;
