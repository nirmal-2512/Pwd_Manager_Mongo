import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-purple-900 flex flex-row justify-between h-20 px-10 align-middle items-center text-white text-2xl">
      <div className="w-10 h-5 text-center align-centre font-bold text-[15px] md:text-2xl">
        <span className="text-green-500">&lt;</span>
        <span className="text-red-500">N/P</span>
        <span className="text-green-500">&gt;</span>
      </div>
      <div className=" flex gap-5 justify-self-center font-bold text-[15px] md:text-2xl">
        Password Manager
      </div>
      <button className="bg-purple-600 px-3 py-2 border-2 text-[15px] md:text-2xl text-1xl border-white rounded-full flex flex-row items-center gap-3">
        <img className="invert md:w-10 w-5" src="/icons/github.png" alt="" />
        <span className="font-bold">GitHub</span>
      </button>
    </nav>
  );
};

export default Navbar;
