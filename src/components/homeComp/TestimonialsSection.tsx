import React from "react";
import ManualSlider from "./ManualSlider";

const TestimonialsSection: React.FC = () => {
  return (
    <section className=" py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          What Our Users Say
        </h2>
        <ManualSlider />
      </div>
    </section>
  );
};

export default TestimonialsSection;
