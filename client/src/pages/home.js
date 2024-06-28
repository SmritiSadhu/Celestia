import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import JobField from "../components/JobField";

const Home = () => {
  const [selectedRole, setSelecteRole] = useState();
  const [selectIndustry, setIndustry] = useState("");

  return (
    <div className="flex justify-center items-center my-12 flex-col">
      {/* tech non tech button */}
      <h2 className="text-4xl font-bold text-[#2b8fc2] mb-8">
        Select an Industry
      </h2>
      <JobField />
    </div>
  );
};

export default Home;
