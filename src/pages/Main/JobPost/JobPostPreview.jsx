// export default function JobPostPreview() {
//   return (
//     <>
//       <h3>JobPostPreview</h3>
//     </>
//   );
// }
import {
  FaCalendarAlt,
  FaClock,
  FaHospital,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUser,
} from "react-icons/fa";
import { FiChevronLeft } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

export default function JobPostPreview() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <p>No job data to preview.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Post
        </button>
      </div>
    );
  }

  // Destructure fields with default fallback values
  const {
    title = "Registered nurse - progressive care",
    address = "New York, USA",
    deadline = "12 April",
    jobType = "Full time",
    salary = "$1520 - $1600",
    vacancy = "12",
    startDate = "25 April 2025",
    endDate = "25 April 2025",
    hoursPerWeek = "38",
    description = `
      <p>We are looking for a qualified and compassionate Registered Nurse to join our team. As a nurse in our organization, you will be responsible for providing high-quality patient care, administering medications, monitoring patient conditions, and collaborating with our healthcare team. This role requires strong clinical knowledge, empathy, and a commitment to excellence in healthcare services.</p>
    `,
    companyLogoName = "Logo.jpg",
  } = state;

  // Static arrays for preview content
  const responsibilities = [
    "Provide direct patient care in accordance with medical guidelines",
    "Monitor and record patient vital signs and medical history",
    "Administer medications and treatments accurately",
    "Educate patients and families about ongoing care",
    "Maintain detailed and up-to-date patient records",
    "Collaborate with physicians and other healthcare professionals",
  ];
  const requirements = [
    "Valid Nursing License (RN)",
    "Degree in Nursing or equivalent qualification",
    "Recent work experience in clinical or hospital setting",
    "Excellent communication and interpersonal skills",
    "Ability to handle stressful situations with calmness and professionalism",
    "Basic computer skills for maintaining electronic health records",
  ];
  const benefits = [
    "Competitive salary and performance bonuses",
    "Health insurance and paid sick leave",
    "Flexible work hours and supportive team environment",
    "Ongoing training and professional development opportunities",
    "Safe and modern workplace",
  ];

  return (
    <div className="max-w-5xl mx-auto bg-white min-h-screen rounded-lg shadow-md p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Sticky Header with Back Button */}
      <div className="lg:col-span-3 flex items-center mb-6 sticky top-0 bg-white p-4 shadow">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="mr-4 p-2 rounded hover:bg-gray-200 transition"
        >
          <FiChevronLeft className="h-6 w-6 text-blue-600" />
        </button>
        <h1 className="text-xl font-bold text-blue-700">Preview Job Post</h1>
      </div>

      {/* Left Column */}
      <div className="lg:col-span-2">
        {/* Company and Job Title */}
        <div className="flex items-center mb-6 gap-4">
          <FaHospital className="text-blue-600 w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold text-blue-700">{title}</h2>
            <p className="text-gray-500">{address}</p>
          </div>
        </div>

        {/* Description */}
        <div
          className="mb-6"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        {/* Responsibilities */}
        <section className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Key Responsibilities:</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {responsibilities.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Requirements */}
        <section className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Requirements:</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {requirements.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Benefits */}
        <section className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Benefits:</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {benefits.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <p className="text-gray-700">
          Our company is committed to delivering exceptional healthcare services
          with compassion and integrity. Our team is dedicated to providing a
          supportive and collaborative environment where staff can thrive and
          grow professionally. We believe that quality care starts with a
          quality team. Join us in making a difference in the lives of our
          patients and community.
        </p>
      </div>

      {/* Right Column - Job Overview */}
      <div className="bg-blue-50 p-6 rounded-lg shadow-md">
        <h3 className="font-semibold text-xl mb-4">Job Overview</h3>

        <div className="flex items-center mb-3 gap-3">
          <FaMapMarkerAlt className="text-blue-600" />
          <div>
            <p className="text-sm font-medium text-gray-500">Address</p>
            <p>{address}</p>
          </div>
        </div>

        <div className="flex items-center mb-3 gap-3">
          <FaCalendarAlt className="text-blue-600" />
          <div>
            <p className="text-sm font-medium text-gray-500">Start Date</p>
            <p>{startDate}</p>
          </div>
        </div>

        <div className="flex items-center mb-3 gap-3">
          <FaCalendarAlt className="text-blue-600" />
          <div>
            <p className="text-sm font-medium text-gray-500">End Date</p>
            <p>{endDate}</p>
          </div>
        </div>

        <div className="flex items-center mb-3 gap-3">
          <FaUser className="text-blue-600" />
          <div>
            <p className="text-sm font-medium text-gray-500">Vacancy</p>
            <p>{vacancy}</p>
          </div>
        </div>

        <div className="flex items-center mb-3 gap-3">
          <FaClock className="text-blue-600" />
          <div>
            <p className="text-sm font-medium text-gray-500">Hours per week</p>
            <p>{hoursPerWeek}</p>
          </div>
        </div>

        <div className="flex items-center mb-3 gap-3">
          <FaMoneyBillWave className="text-blue-600" />
          <div>
            <p className="text-sm font-medium text-gray-500">Monthly Pay</p>
            <p>{salary}</p>
          </div>
        </div>

        <button
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          onClick={() => navigate(-1)}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
