import React from "react";

const JobRolesBadge = ({ item, selectedRole, setSelecteRole }) => {
    
  return (
    <div>
      <button
        className={`py-2 px-3 border rounded-full text-sm hover:scale-105 ${
          selectedRole.role === item.role
            ? "bg-gradient border-cyan-300 text-cyan-800"
            : "text-cyan-800"
        }`}
        onClick={() => setSelecteRole(item)}
      >
        {item.role}
      </button>
    </div>
  );
};

export default JobRolesBadge;
