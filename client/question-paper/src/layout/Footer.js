import React from "react";

const Footer = () => {
  return (
    <footer className=" py-6 ">
      <div className="container mx-auto px-4 cursor-pointer">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Section */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-lg font-semibold">Question Paper Generator</h2>
            <p className="text-sm mt-1">
              Simplifying Exam Creation and Enhancing the Learning Experience.
            </p>
          </div>

          {/* Center Section */}
          <div className="flex justify-center space-x-4 mb-4 md:mb-0">
            <p className="hover:text-gray-400 transition duration-200">
              About Us
            </p>
            <p className="hover:text-gray-400 transition duration-200">
              Contact
            </p>
            <p className="hover:text-gray-400 transition duration-200">
              Privacy Policy
            </p>
          </div>

          {/* Right Section */}
          <div className="text-center md:text-right">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Question Paper Generator Portal.
            </p>
            <p className="text-sm">All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
