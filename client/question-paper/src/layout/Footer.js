import React from "react";

const Footer = () => {
  return (
    <footer className=" py-6">
      <div className="container mx-auto px-4 cursor-pointer">
        <div className="flex flex-col md:flex-row justify-between items-center text-white-700">
          {/* Left Section */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-base sm:text-lg font-semibold">
              Question Paper Generator
            </h2>
            <p className="text-xs sm:text-sm mt-1 max-w-xs mx-auto md:mx-0">
              Simplifying Exam Creation and Enhancing the Learning Experience.
            </p>
          </div>

          {/* Center Section */}
          <div className="flex flex-wrap justify-center gap-4 mb-4 md:mb-0 text-sm">
            <p className="hover:text-gray-500 transition duration-200">
              About Us
            </p>
            <p className="hover:text-gray-500 transition duration-200">
              Contact
            </p>
            <p className="hover:text-gray-500 transition duration-200">
              Privacy Policy
            </p>
          </div>

          {/* Right Section */}
          <div className="text-center md:text-right text-xs sm:text-sm">
            <p>
              &copy; {new Date().getFullYear()} Question Paper Generator Portal.
            </p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
