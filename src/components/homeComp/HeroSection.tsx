import React from "react";
import Link from "next/link";

const HeroSection: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Welcome to TaskFlow</h2>
        <p className="text-lg text-gray-300 mb-8">
          Your ultimate destination for efficient task management and seamless
          collaboration.
        </p>
        <div className="flex justify-center">
          <Link
            href="/auth/singup"
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-medium transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
