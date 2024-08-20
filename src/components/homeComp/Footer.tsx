import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 py-8">
      <div className="container mx-auto px-4 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <p className="text-gray-400">Contact us: info@taskflow.com</p>
          <div className="mt-4 md:mt-0">
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition duration-300 mr-4"
            >
              Privacy Policy
            </Link>
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
