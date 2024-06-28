import React from "react";
import { BsRobot } from "react-icons/bs";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="py-4 px-6 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-2 text-primary">
        <BsRobot size={30} />
        <Link to="/" className="text-xl font-bold">Celestia</Link>
      </div>
    </div>
  );
};

export default Navbar;
