import { Pagination } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetJobsQuery } from "../../../redux/features/jobs/jobsApi";

export default function AllJobs() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { data } = useGetJobsQuery({ page });
  console.log(data);

  const jobs = data?.data?.allJobs || [];

  const handlePaginationChange = (page) => {
    setPage(page);
  };

  const totalItems = data?.data?.pagination?.totalData || 0;

  return (
    <>
      <div className="z-20" style={{ padding: 20 }}>
        <h3 className="text-primary text-2xl font-bold mb-4">
          Total jobs: {jobs.length}
        </h3>
        {jobs?.map((job) => (
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
                {job?.hospitalName}
              </div>
              <div style={{ fontSize: 12, color: "gray" }}>{job.location}</div>
              <div className="text-primary font-bold text-xl ">
                {job?.title}
              </div>
              <div style={{ fontSize: 14, marginTop: 6, lineHeight: 1.4 }}>
                {job.description.slice(0, 150)}{" "}
                <span
                  onClick={() => navigate(`/all-jobs/${job._id}`)}
                  className="text-primary cursor-pointer"
                >
                  See nome...
                </span>
              </div>
              <div className="text-primary font-bold text-lg ">
                Monthly Pay: ${job.salary}
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
                  backgroundColor: "#1077BC",
                  borderRadius: 6,
                  padding: "6px 12px",
                  color: "white",
                  fontWeight: "600",
                  fontSize: 14,
                }}
                onClick={() => navigate(`/all-jobs/all-applicants/${job._id}`)}
              >
                Total Applicants : {job.totalApply.toString().padStart(2, "0")}
              </button>

              <button
                style={{
                  backgroundColor: "#1077BC",
                  border: "none",
                  borderRadius: 6,
                  padding: "8px 16px",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
                onClick={() => navigate(`/all-jobs/${job._id}`)}
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center p-4">
        <Pagination
          current={page}
          total={totalItems}
          pageSize={10}
          onChange={handlePaginationChange}
          showQuickJumper
          showSizeChanger={false}
        />
      </div>
    </>
  );
}
