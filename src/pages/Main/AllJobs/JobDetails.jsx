// export default function JobDetails() {
//   return (
//     <>
//       <h3>JobDetails</h3>
//     </>
//   );
// }

import { useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaHospital,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUser,
} from "react-icons/fa";
import { FiBookmark, FiChevronLeft } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

const allJobs = [
  {
    id: "1",
    title: "Registered nurse- progressive care",
    hospital: "AB Hospital",
    location: "New York, USA",
    startDate: "25 April 2025",
    endDate: "12 May 2025",
    vacancy: 12,
    hoursPerWeek: 35,
    monthlyPay: "$ 1250 - $ 1800",
    responsibilities: [
      "Provide direct patient care in accordance with medical guidelines",
      "Monitor and record patient vital signs and medical history",
      "Administer medications and treatments accurately",
      "Educate patients and families about ongoing care",
      "Maintain detailed and up-to-date patient records",
      "Collaborate with physicians and other healthcare professionals",
    ],
    requirements: [
      "Valid Nursing License (RN)",
      "Degree in Nursing or equivalent qualification",
      "Recent work experience in clinical or hospital setting",
      "Excellent communication and interpersonal skills",
      "Ability to handle stressful situations with calmness and professionalism",
      "Basic computer skills for maintaining electronic health records",
    ],
    benefits: [
      "Competitive salary and performance bonuses",
      "Health insurance and paid sick leave",
      "Flexible work hours and supportive team environment",
      "Ongoing training and professional development opportunities",
      "Safe and modern workplace",
    ],
    description:
      "We are looking for a qualified and compassionate Registered Nurse to join our team. As a nurse in our organization, you will be responsible for providing high-quality patient care, administering medications, monitoring patient conditions, and collaborating with our healthcare team. This role requires strong clinical knowledge, empathy, and a commitment to excellence in healthcare services.",
  },
  // Add more jobs as needed...
];

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Find the job by id
  const jobDetails = allJobs.find((job) => job.id === id);

  if (!jobDetails) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 underline mb-4"
        >
          ← Back
        </button>
        <h2>Job not found</h2>
      </div>
    );
  }

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-7xl mx-auto bg-gray-50 min-h-screen ">
      {/* Header */}
      <div className=" bg-white shadow-sm p-4 flex items-center">
        <button
          onClick={handleBack}
          className="text-primary mr-2 cursor-pointer"
          aria-label="Go back"
        >
          <FiChevronLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold text-primary">Details of this Job</h1>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column (Main Content) */}
          <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 relative">
              {/* Bookmark Button */}
              <button
                onClick={toggleBookmark}
                className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors  cursor-pointer"
                aria-label="Bookmark job"
              >
                <FiBookmark
                  className={`w-5 h-5 ${
                    isBookmarked ? "text-primary fill-primary" : "text-gray-400"
                  }`}
                />
              </button>

              {/* Hospital Info */}
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-50 rounded-full text-primary mr-4">
                  <FaHospital className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{jobDetails.hospital}</h2>
                  <p className="text-gray-500 flex items-center">
                    <FaMapMarkerAlt className="mr-1" />
                    {jobDetails.location}
                  </p>
                </div>
              </div>

              {/* Job Title and Description */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-primary mb-4">
                  {jobDetails.title}
                </h1>
                <p className="text-gray-700 mb-6">{jobDetails.description}</p>
              </div>

              {/* Responsibilities */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Key Responsibilities:
                </h2>
                <ul className="space-y-2 pl-5 list-disc">
                  {jobDetails.responsibilities.map((item, index) => (
                    <li key={index} className="text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Requirements:
                </h2>
                <ul className="space-y-2 pl-5 list-disc">
                  {jobDetails.requirements.map((item, index) => (
                    <li key={index} className="text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Benefits:
                </h2>
                <ul className="space-y-2 pl-5 list-disc">
                  {jobDetails.benefits.map((item, index) => (
                    <li key={index} className="text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Description */}
              <div className="mb-6">
                <p className="text-gray-700">
                  Our company is committed to delivering exceptional healthcare
                  services with compassion and integrity. Our team is dedicated
                  to providing a supportive and collaborative environment where
                  staff can thrive and grow professionally. We believe that
                  quality care starts with a quality team. Join us in making a
                  difference in the lives of our patients and community.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (Job Overview) */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white lg:sticky lg:top-20 rounded-xl shadow-md overflow-hidden">
              {/* Job Overview Header */}
              <div className="bg-primary text-white p-6">
                <h3 className="text-xl font-bold text-center">Job Overview</h3>
              </div>

              {/* Job Details */}
              <div className="p-6 space-y-4">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p className="text-gray-700">{jobDetails.location}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaCalendarAlt className="text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Start Date
                    </p>
                    <p className="text-gray-700">{jobDetails.startDate}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaCalendarAlt className="text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      End Date
                    </p>
                    <p className="text-gray-700">{jobDetails.endDate}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaUser className="text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Vacancy</p>
                    <p className="text-gray-700">{jobDetails.vacancy}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaClock className="text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Hours per week
                    </p>
                    <p className="text-gray-700">{jobDetails.hoursPerWeek}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaMoneyBillWave className="text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Monthly Pay
                    </p>
                    <p className="text-gray-700">{jobDetails.monthlyPay}</p>
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <div className="p-6">
                <p className="w-full mx-auto text-center bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-lg font-medium transition-colors ">
                  Total Applicant (7)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
