import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import PromptBox from "../components/PromptBox";
import { jobRolesTech } from "../data/roleTemplate";
import JobRolesBadge from "../components/JobRolesBadge";
import { Link } from "react-router-dom";

const GenerateTech = () => {
  const [selectedRole, setSelecteRole] = useState(jobRolesTech[0]);
  return (
    <div className="flex justify-center items-center my-12 flex-col">
      {/* tech non tech button */}
      <h2 className="text-4xl font-bold text-primary mb-8">
        Select A Job Role
      </h2>
      <div className="my-4 flex flex-wrap gap-3">
        <button>
          <Link to="/" className="text-primary">
            {" "}
            <IoIosArrowBack />
          </Link>
        </button>

        {jobRolesTech.map((item, index) => (
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

export default GenerateTech;
