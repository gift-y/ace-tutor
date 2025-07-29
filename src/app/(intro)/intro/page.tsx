"use client";
import { useState } from "react";
import Button from "@/components/Button";
import Link from "next/link";

const Page = () => {
  const [currentContent, setCurrentContent] = useState(0);

  const handleNext = () => {
    if (currentContent < 5) {
      setCurrentContent((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentContent > 0) {
      setCurrentContent((prev) => prev - 1);
    }
  };

  const contentSections = [
    <div key={0} className="flex flex-col h-full">
      <h1 className="text-3xl font-bold mb-4">AceTutor</h1>
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} className="w-6 h-2 rounded-sm bg-pink"></span>
        ))}
      </div>
      <div className="py-4 mt-10 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold">Hey there!</h2>
          <p className="text-gray-500 py-4 font-semibold leading-tight">
            We will collect a few details to give you the best experience which
            will personalize your learning experience
          </p>
        </div>
        <Button
          size="small"
          variant="secondary"
          className="mt-6"
          onClick={handleNext}
        >
          Get Started
        </Button>
      </div>
    </div>,

    // Content 1: Personal Details
    <div key={1} className="flex flex-col h-full">
      <h2 className="text-xl font-semibold">How do you learn best?</h2>
      <p className="text-gray-500 py-4 font-semibold leading-tight">
        Select your preferred learning style to help us personalize your
        experience
      </p>
      <div className="flex flex-col gap-4 flex-1">
        <input
          type="text"
          placeholder="Your Name"
          className="border border-gray-300 rounded-md p-2"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="border border-gray-300 rounded-md p-2"
        />
        <div className="flex gap-4 mt-auto">
          <Button size="small" variant="primary" onClick={handleBack}>
            Back
          </Button>
          <Button size="small" variant="secondary" onClick={handleNext}>
            Next
          </Button>
        </div>
      </div>
    </div>,
    // Content 2: Learning Goals
    <div key={2} className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4">Your Learning Goals</h2>
      <p className="text-gray-500 mb-4">
        Tell us about your learning objectives to tailor your experience.
      </p>
      <div className="flex flex-col gap-4 flex-1">
        <select className="border border-gray-300 rounded-md p-2">
          <option value="">Select your goal</option>
          <option value="math">Master Mathematics</option>
          <option value="science">Excel in Science</option>
          <option value="coding">Learn Coding</option>
        </select>
        <div className="flex gap-4 mt-auto">
          <Button size="small" variant="primary" onClick={handleBack}>
            Back
          </Button>
          <Button size="small" variant="secondary" onClick={handleNext}>
            Next
          </Button>
        </div>
      </div>
    </div>,
    // Content 3: Preferred Learning Style
    <div key={3} className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4">Learning Style</h2>
      <p className="text-gray-500 mb-4">
        How do you prefer to learn? Choose your style.
      </p>
      <div className="flex flex-col gap-4 flex-1">
        <label className="flex items-center gap-2">
          <input type="radio" name="learning-style" value="visual" />
          Visual (Videos & Diagrams)
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="learning-style" value="auditory" />
          Auditory (Lectures & Podcasts)
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="learning-style" value="kinesthetic" />
          Kinesthetic (Hands-on & Practice)
        </label>
        <div className="flex gap-4 mt-auto">
          <Button size="small" variant="primary" onClick={handleBack}>
            Back
          </Button>
          <Button size="small" variant="secondary" onClick={handleNext}>
            Next
          </Button>
        </div>
      </div>
    </div>,
    // Content 4: Schedule Preferences
    <div key={4} className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4">Schedule Preferences</h2>
      <p className="text-gray-500 mb-4">
        When are you available to learn? Set your preferred times.
      </p>
      <div className="flex flex-col gap-4 flex-1">
        <input
          type="text"
          placeholder="Preferred Days (e.g., Mon, Wed, Fri)"
          className="border border-gray-300 rounded-md p-2"
        />
        <input
          type="text"
          placeholder="Preferred Time (e.g., 7 PM - 9 PM)"
          className="border border-gray-300 rounded-md p-2"
        />
        <div className="flex gap-4 mt-auto">
          <Button size="small" variant="primary" onClick={handleBack}>
            Back
          </Button>
          <Button size="small" variant="secondary" onClick={handleNext}>
            Next
          </Button>
        </div>
      </div>
    </div>,
    // Content 5: Confirmation
    <div key={5} className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4">All Set!</h2>
      <p className="text-gray-500 mb-4">
        You're ready to start your personalized learning journey with AceTutor!
      </p>
      <div className="flex flex-col gap-4 flex-1">
        <p className="text-gray-700">
          We'll use your details to create a tailored learning plan. Get ready
          to dive in!
        </p>
        <div className="flex gap-4 mt-auto">
          <Button size="small" variant="primary" onClick={handleBack}>
            Back
          </Button>
          <Button
            size="small"
            variant="secondary"
            onClick={() => setCurrentContent(0)}
          >
          <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </div>
    </div>,
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100">
      <main className="text-center flex flex-col bg-white rounded-xl px-10 py-7 text-black shadow-xl w-full sm:w-1/2 md:w-1/3 lg:w-1/4 relative overflow-hidden min-h-[400px]">
        {contentSections.map((section, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out transform ${
              currentContent === index
                ? "translate-x-0 opacity-100"
                : currentContent > index
                ? "-translate-x-full opacity-0"
                : "translate-x-full opacity-0"
            } bg-white rounded-xl px-10 py-7`}
          >
            {section}
          </div>
        ))}
      </main>
    </div>
  );
};

export default Page;
