import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import PromptBox from "../components/PromptBox";
import { jobRolesNonTech } from "../data/roleTemplate";
import JobRolesBadge from "../components/JobRolesBadge";
import { Link, useLocation } from "react-router-dom";

const GenerateNontech = () => {
  const [selectedRole, setSelecteRole] = useState(jobRolesNonTech[0]);
  const location = useLocation();
  const {roles} = location.state || {};
  const handleCustomRole = () => {
    setSelecteRole({ role: "Custom Role" });
  };
  return (
    <div className="flex justify-center items-center my-12 flex-col">
      {/* tech non tech button */}
      <h2 className="text-4xl font-bold text-primary mb-8">
        Select A Job Role
      </h2>
      <div className="my-4 flex flex-wrap gap-3">
        <button>
          <Link to="/" className="text-gray-400">
            {" "}
            <IoIosArrowBack />
          </Link>
        </button>

        <div>
        <button
          className={`py-2 px-3 border rounded-full text-sm hover:scale-105 ${
            selectedRole?.role === "Custom Role"
              ? "bg-gradient border-cyan-300 text-cyan-800"
              : "text-cyan-800"
          }`}
          onClick={handleCustomRole}
        >
          Custom Role
        </button>
      </div>

        {roles.map((item, index) => (
          <JobRolesBadge
            key={index}
            item={item}
            selectedRole={selectedRole}
            setSelecteRole={setSelecteRole}
          />
        ))}
      </div>
      <div>
        <PromptBox selectedRole={selectedRole} />
      </div>
    </div>
  );
};

export default GenerateNontech;
