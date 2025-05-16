import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function InternationalApplicantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setLoading(true);

    // Dummy data - would be replaced with API call
    const fetchData = () => {
      return {
        personalInfo: {
          fullName: "Clementsolus",
          email: "clementsolus@gmail.com",
          phone: "9899959550",
          gender: "Male",
          country: "USA",
          state: "New York",
          city: "New York",
        },
        expertise: {
          profession: "Nurse",
          discipline: "Front professional",
          specialty: "Skilled Nursing",
          secondarySpecialty: "Long-term acute care",
        },
        certification: {
          license: "Medical assistant (New York)",
          certification: "Therapist",
        },
        education: {
          school: "Nursing",
          graduationDate: "15 April 2022",
          degree: "Nursing",
          major: "Nursing",
          country: "USA",
          city: "New York",
        },
        employmentHistory: {
          company: "All Hospital",
          specialty: "Skilled Nursing",
          country: "USA",
          state: "New York",
          city: "New York",
          startDate: "12 April 2023",
          endDate: "16 April 2023",
        },
      };
    };

    // Simulate API call delay
    setTimeout(() => {
      setApplicant(fetchData());
      setLoading(false);
    }, 500);
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!applicant) {
    return (
      <div className="text-center p-8">
        <h3 className="text-xl font-medium text-gray-700">
          Applicant not found
        </h3>
        <button
          onClick={handleBack}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header with back button */}
      <div className="bg-secondary p-3 flex items-center">
        <button
          onClick={handleBack}
          className="flex items-center text-primary hover:text-primary/80"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Applicants Details
        </button>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-4">
        {/* Personal Information */}
        <div className="bg-secondary rounded-md p-6 mb-4">
          <h3 className="text-center text-lg font-semibold mb-6">
            Personal Information
          </h3>

          <div className="mb-6">
            <h4 className="font-bold text-gray-700 mb-2">About Employee</h4>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Full Name: </span>
                {applicant.personalInfo.fullName}
              </div>
              <div>
                <span className="font-medium">Email: </span>
                {applicant.personalInfo.email}
              </div>
              <div>
                <span className="font-medium">Phone no.: </span>
                {applicant.personalInfo.phone}
              </div>
              <div>
                <span className="font-medium">Gender: </span>
                {applicant.personalInfo.gender}
              </div>
              <div>
                <span className="font-medium">Country: </span>
                {applicant.personalInfo.country}
              </div>
              <div>
                <span className="font-medium">State: </span>
                {applicant.personalInfo.state}
              </div>
              <div>
                <span className="font-medium">City: </span>
                {applicant.personalInfo.city}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-700 mb-2">Expertise</h4>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Profession: </span>
                {applicant.expertise.profession}
              </div>
              <div>
                <span className="font-medium">Discipline: </span>
                {applicant.expertise.discipline}
              </div>
              <div>
                <span className="font-medium">Specialty: </span>
                {applicant.expertise.specialty}
              </div>
              <div>
                <span className="font-medium">Secondary specialty: </span>
                {applicant.expertise.secondarySpecialty}
              </div>
            </div>
          </div>
        </div>

        {/* Certification and credentials */}
        <div className="bg-secondary rounded-md p-6 mb-4">
          <h3 className="text-center text-lg font-semibold mb-6">
            Certification and credentials
          </h3>

          <div>
            <h4 className="font-bold text-gray-700 mb-2">
              License and certificate
            </h4>
            <div className="space-y-2">
              <div>
                <span className="font-medium">License: </span>
                {applicant.certification.license}
              </div>
              <div>
                <span className="font-medium">Certification: </span>
                {applicant.certification.certification}
              </div>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="bg-secondary rounded-md p-6 mb-4">
          <h3 className="text-center text-lg font-semibold mb-6">Education</h3>

          <div className="space-y-2">
            <div>
              <span className="font-medium">School/Program: </span>
              {applicant.education.school}
            </div>
            <div>
              <span className="font-medium">Graduation Date: </span>
              {applicant.education.graduationDate}
            </div>
            <div>
              <span className="font-medium">Degree: </span>
              {applicant.education.degree}
            </div>
            <div>
              <span className="font-medium">Major: </span>
              {applicant.education.major}
            </div>
            <div>
              <span className="font-medium">Country: </span>
              {applicant.education.country}
            </div>
            <div>
              <span className="font-medium">City: </span>
              {applicant.education.city}
            </div>
          </div>
        </div>

        {/* Employment History */}
        <div className="bg-secondary rounded-md p-6">
          <h3 className="text-center text-lg font-semibold mb-6">
            Employment History
          </h3>

          <div className="space-y-2">
            <div>
              <span className="font-medium">Company Name: </span>
              {applicant.employmentHistory.company}
            </div>
            <div>
              <span className="font-medium">Specialty: </span>
              {applicant.employmentHistory.specialty}
            </div>
            <div>
              <span className="font-medium">Country: </span>
              {applicant.employmentHistory.country}
            </div>
            <div>
              <span className="font-medium">State: </span>
              {applicant.employmentHistory.state}
            </div>
            <div>
              <span className="font-medium">City: </span>
              {applicant.employmentHistory.city}
            </div>
            <div>
              <span className="font-medium">Start Date: </span>
              {applicant.employmentHistory.startDate}
            </div>
            <div>
              <span className="font-medium">End Date: </span>
              {applicant.employmentHistory.endDate}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
