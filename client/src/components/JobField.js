import React from "react";
import tech from "../assets/tech.png";
import nontech from "../assets/nontech.png";
import { Link } from "react-router-dom";

const JobField = () => {
  return (
    <div className="flex justify-between items-center gap-24 my-8">
      <Link
        to="/tech"
        className="w-[380px] bg-gray-200 rounded-lg p-6 shadow-neumorphic hover:scale-105 hover:text-primary cursor-pointer text-center"
      >
        <img src={tech} alt="tech" className="rounded-lg" />
        <span>Technical Roles</span>
      </Link>
      <Link
        to="/nontech"
        className="w-[380px] bg-gray-200 rounded-lg p-6 shadow-neumorphic hover:scale-105 hover:text-primary cursor-pointer text-center"
      >
        <img src={nontech} alt="nontech" className="rounded-lg" />
        <span>Non-Technical Roles</span>
      </Link>
    </div>
  );
};

export default JobField;
