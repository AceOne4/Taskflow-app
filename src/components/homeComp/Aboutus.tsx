import React from "react";

const AboutUsSection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">About Us</h2>
          <p className="text-lg text-gray-300 mb-8">
            TaskFlow is dedicated to providing a comprehensive task management
            and collaboration solution for teams of all sizes. Our mission is to
            streamline project workflows, enhance team communication, and boost
            productivity.
          </p>
          <p className="text-lg text-gray-300">
            Founded in 2020, TaskFlow has grown from a vision of simplifying
            task management into a trusted platform used by businesses
            worldwide. We continue to innovate and evolve to meet the dynamic
            needs of modern teams.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
