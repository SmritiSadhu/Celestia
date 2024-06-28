import React, { useEffect, useState } from "react";
//import GenerateAnswer from "./GenerateAnswer";
import axios from "axios";

function PromptBox({ selectedRole }) {
  const [formData, setFormData] = useState({
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (selectedRole && selectedRole.role !== "Custom Role") {
      const combinedMessage = `${
        selectedRole.roleSummary
      }\n\nResponsibilities:\n${selectedRole.responsibilities.join(
        "\n"
      )}\n\nRequirements:\n${selectedRole.requirements.join("\n")}`;
      setFormData({ message: combinedMessage });
    } else {
      setFormData({ message: "" });
    }
  }, [selectedRole]);
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

  return (
    <>
      <form onSubmit={handleSubmit}>
        {errorMessage && (
          <p className="text-red-700 text-center font-semibold my-6">
            {errorMessage}
          </p>
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

      {/* <GenerateAnswer formData={formData} interviewRounds={interviewRounds} /> */}
    </>
  );
}
export default PromptBox;
