/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";

interface Testimonial {
  opinion: string;
  name: string;
  position: string;
}

const testimonials: Testimonial[] = [
  {
    opinion:
      "TaskFlow has completely transformed the way our team manages projects. It's intuitive and packed with features.",
    name: "John Doe",
    position: "Project Manager at XYZ Corp",
  },
  {
    opinion:
      "The real-time collaboration tools in TaskFlow have improved our team's communication and productivity.",
    name: "Jane Smith",
    position: "Lead Developer at ABC Inc",
  },
  {
    opinion:
      "I love how easy it is to track tasks and deadlines with TaskFlow. It's a game-changer for our company.",
    name: "Michael Brown",
    position: "CEO at Example LLC",
  },
  {
    opinion:
      "TaskFlow's user-friendly interface makes it simple for our team to stay organized and on track.",
    name: "Emily Johnson",
    position: "Product Manager at Sample Co",
  },
  {
    opinion:
      "The task tracking and reporting features in TaskFlow help us stay on top of our project goals and milestones.",
    name: "Chris Lee",
    position: "Operations Manager at Tech Solutions",
  },
];

const ManualSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? totalPages - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = currentIndex === totalPages - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const getCurrentItems = () => {
    const startIndex = currentIndex * itemsPerPage;
    return testimonials.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
        }}
      >
        {getCurrentItems().map((testimonial, index) => (
          <div key={index} className="w-full md:w-1/3 px-4">
            <div className="bg-gray-700 rounded-lg p-6 my-2 mx-2 md:mx-0">
              <p className="text-gray-300 mb-4">"{testimonial.opinion}"</p>
              <p className="text-blue-500 font-bold">{testimonial.name}</p>
              <p className="text-gray-400">{testimonial.position}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none"
      >
        &#10095;
      </button>
    </div>
  );
};

export default ManualSlider;
