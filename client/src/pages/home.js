import React, { useState, useEffect } from "react";
import axios from "axios";
import JobField from "../components/JobField";

const Home = () => {
  const [rolesData, setRolesData] = useState([]);
  const [selectedRole, setSelectedRole] = useState();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/questionnaire/getroles");
        setRolesData(response.data);
      
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);
  //console.log(rolesData)
  

  const techRoles = rolesData.filter(role => role.roleDomain === "Tech");
  const nontechRoles = rolesData.filter(role => role.roleDomain === "Non-Tech");

  return (
    <div className="flex justify-center items-center my-12 flex-col">
      {/* tech non tech button */}
      <h2 className="text-4xl font-bold text-[#2b8fc2] mb-8">Select an Industry</h2>
      <JobField techRoles={techRoles} nontechRoles={nontechRoles}/>
    </div>
  );
};

export default Home;