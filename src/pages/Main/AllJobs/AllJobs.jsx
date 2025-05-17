// export default function AllJobs() {
//   return (
//     <>
//       <h3>AllJobs</h3>
//     </>
//   );
// }

import { useNavigate } from "react-router-dom";

const jobs = [
  {
    id: "1",
    hospital: "AB Hospital",
    location: "New York, USA",
    title: "Registered nurse - progressive care",
    description: `We are looking for a qualified and compassionate Registered Nurse to join our team. As a nurse in our organization, you will be responsible for providing high-quality patient care.`,
    monthlyPay: "$1520 - $1600",
    totalApplicants: 3,
  },
  {
    id: "2",
    hospital: "AB Hospital",
    location: "New York, USA",
    title: "Registered nurse - progressive care",
    description: `We are looking for a qualified and compassionate Registered Nurse to join our team. As a nurse in our organization, you will be responsible for providing high-quality patient care.`,
    monthlyPay: "$1520 - $1600",
    totalApplicants: 12,
  },
  {
    id: "3",
    hospital: "AB Hospital",
    location: "New York, USA",
    title: "Registered nurse - progressive care",
    description: `We are looking for a qualified and compassionate Registered Nurse to join our team. As a nurse in our organization, you will be responsible for providing high-quality patient care.`,
    monthlyPay: "$1520 - $1600",
    totalApplicants: 12,
  },
  {
    id: "4",
    hospital: "AB Hospital",
    location: "New York, USA",
    title: "Registered nurse - progressive care",
    description: `We are looking for a qualified and compassionate Registered Nurse to join our team. As a nurse in our organization, you will be responsible for providing high-quality patient care.`,
    monthlyPay: "$1520 - $1600",
    totalApplicants: 12,
  },
];

export default function AllJobs() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h3 style={{ fontWeight: "bold", marginBottom: 20 }}>
        Total jobs: {jobs.length}
      </h3>
      {jobs.map((job) => (
        <div
          key={job.id}
          style={{
            backgroundColor: "#E6F0FA",
            borderRadius: 10,
            padding: 20,
            marginBottom: 20,
            display: "flex",
            gap: 15,
            alignItems: "flex-start",
          }}
        >
          {/* Left Icon */}
          <div
            style={{
              backgroundColor: "#3083DC",
              color: "white",
              borderRadius: "50%",
              width: 50,
              height: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 24,
            }}
          >
            🏥
          </div>

          {/* Job Info */}
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: "bold", fontSize: 16 }}>
              {job.hospital}
            </div>
            <div style={{ fontSize: 12, color: "gray" }}>{job.location}</div>
            <div style={{ marginTop: 8, fontWeight: "bold", color: "#1F5AA5" }}>
              {job.title}
            </div>
            <div style={{ fontSize: 14, marginTop: 6, lineHeight: 1.4 }}>
              {job.description}{" "}
              <span style={{ color: "#3083DC", cursor: "pointer" }}>
                see more
              </span>
            </div>
            <div style={{ marginTop: 6, fontSize: 12, color: "#3083DC" }}>
              Monthly Pay: {job.monthlyPay}
            </div>
          </div>

          {/* Right side buttons */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              alignItems: "flex-end",
            }}
          >
            <button
              style={{
                backgroundColor: "#7DAADC",
                borderRadius: 6,
                padding: "6px 12px",
                color: "white",
                fontWeight: "600",
                fontSize: 14,
              }}
              onClick={() => navigate(`/all-jobs/all-applicants/${job.id}`)}
            >
              Total Applicants :{" "}
              {job.totalApplicants.toString().padStart(2, "0")}
            </button>

            <button
              style={{
                backgroundColor: "#1678C2",
                border: "none",
                borderRadius: 6,
                padding: "8px 16px",
                color: "white",
                cursor: "pointer",
                fontWeight: "600",
              }}
              onClick={() => navigate(`/all-jobs/${job.id}`)}
            >
              Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
