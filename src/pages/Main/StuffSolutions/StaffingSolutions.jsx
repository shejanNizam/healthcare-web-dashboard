import { useNavigate } from "react-router-dom";

export default function StaffingSolutions({ type }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-end mr-4">
        <button
          onClick={() => navigate(`/add-staff?type=${type}`)}
          className="text-white border bg-primary rounded-full px-6 py-2"
        >
          +Create
        </button>
      </div>
      <h3>StaffingSolutions============{type}</h3>
    </>
  );
}
