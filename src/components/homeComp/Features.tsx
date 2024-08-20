import React from "react";
//@ts-ignore
import {
  ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

// Interface for Feature
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
}

// Sample features data
const features: Feature[] = [
  {
    icon: <ClipboardDocumentListIcon className="text-blue-500 w-6 h-6" />,
    title: "Project Management",
    description: "Efficiently manage projects, tasks, and deadlines.",
    image: "/manage.png",
  },
  {
    icon: <ChatBubbleLeftRightIcon className="text-blue-500 w-6 h-6" />,
    title: "Real-time Collaboration",
    description: "Facilitate seamless communication and teamwork.",
    image: "/colab.png",
  },
  {
    icon: <DocumentChartBarIcon className="text-blue-500 w-6 h-6" />,
    title: "Task Tracking",
    description: "Track task progress, priorities, and status updates.",
    image: "/task.png",
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className=" py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Key Features
        </h2>
        <div className="flex flex-col gap-8 w-full">
          {features.map((feature, index) => (
            <div
              key={index}
              className=" bg-gray-700 rounded-lg p-6 flex items-center gap-10 h-96 w-11/12"
            >
              <div className=" flex items-start">
                <div className="flex-shrink-0 mr-4">{feature.icon}</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </div>
              <div className="flex justify-center items-center mt-5">
                <Image src={feature.image} alt="" height={300} width={300} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
