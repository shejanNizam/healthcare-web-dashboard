import { useNavigate } from "react-router-dom";
import { useGetStuffQuery } from "../../../redux/features/stuff/stuffApi";

const MAIN_URL = import.meta.env.VITE_MAIN_DOMAIN;

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
        <div className="px-20">
          <h1 className="text-2xl font-bold pb-2">Search Engine Listing</h1>
          <br />

          <h3 className="text-xl text-primary ">Cenmhealthcare</h3>
          <a
            target="_blank"
            className="text-primary text-xs pb-6"
            href={MAIN_URL + `/` + type}
          >
            {MAIN_URL + `/` + type}
          </a>
          <br />
          <br />
          <p className="text-primary text-xl font-semibold">
            {stuff?.pageTitle}
          </p>
          <p className="pb-6 text-wrap">{stuff?.mateDescription}</p>
        </div>

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
