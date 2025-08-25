import { useNavigate } from "react-router-dom";
import { useGetStuffQuery } from "../../../redux/features/stuff/stuffApi";

export default function StaffingSolutions({ type }) {
  const navigate = useNavigate();

  const { data } = useGetStuffQuery();
  const stuff = data?.data?.find((item) => item.type === type);
  console.log(stuff);

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
      <h3 className="text-center font-bold text-purple-500">
        StaffingSolutions {"============>"} {type}
      </h3>
      <div className="border rounded-sm shadow-sm p-4 m-4">
        <h1>Staff alias</h1>
        <p> {stuff?.bannerHeading} </p>

        <br />
        <br />
        <div className="flex justify-end mr-4">
          <button
            onClick={() => navigate(`/edit-staff/${stuff?._id}?type=${type}`)}
            className="text-white border bg-primary rounded-full px-6 py-2"
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
}
