import React from "react";
import tech from "../assets/tech.png";
import nontech from "../assets/nontech.png";
import { Link } from "react-router-dom";

const JobField = ({techRoles, nontechRoles}) => {
  return (
    <div className="flex justify-between items-center gap-24 my-8">
      <Link
        to="/tech"
        state={{roles: techRoles}}
        className="w-[380px] bg-gray-200 rounded-lg p-6 shadow-neumorphic hover:scale-105 hover:text-primary cursor-pointer text-center"
      >
        <img src={tech} alt="tech" className="rounded-lg mb-4" />
        <span>Technical Roles</span>
      </Link>
      <Link
        to="/nontech"
        state={{roles: nontechRoles}}
        className="w-[380px] bg-gray-200 rounded-lg p-6 shadow-neumorphic hover:scale-105 hover:text-primary cursor-pointer text-center"
      >
        <img src={nontech} alt="nontech" className="rounded-lg mb-4" />
        <span>Non-Technical Roles</span>
      </Link>
    </div>
  );
};

export default JobField;
