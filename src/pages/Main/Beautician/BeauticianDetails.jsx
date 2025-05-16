import { Button, Spin } from "antd";
import dayjs from "dayjs";
import React from "react";
import { BsStarFill } from "react-icons/bs";
import { FaChevronLeft } from "react-icons/fa";
import Rating from "react-rating";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import C_LOGO from "../../../assets/images/c_logo.png";
import LoaderWraperComp from "../../../Components/LoaderWraperComp";
import HostReviewSlider from "../../../Components/User/HostReviewSlider";
import {
  useApprovedBeauticianMutation,
  useGetBeauticianByIdQuery,
} from "../../../redux/features/common/commonApi";
import { ErrorSwal, SuccessSwal } from "../../../utils/allSwalFire";

const BeauticianDetails = () => {
  const navigate = useNavigate();
  const { profileId } = useParams();

  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  const {
    data: beauticianResponse,
    isLoading,
    error,
  } = useGetBeauticianByIdQuery(profileId);
  const beauticianData = beauticianResponse?.data;

  const [beauticianApprove] = useApprovedBeauticianMutation();

  const handleApprove = async () => {
    try {
      const response = await beauticianApprove({
        id: beauticianData?.id,
      }).unwrap();
      SuccessSwal({
        title: "",
        text: response?.message || "Beautician has been approved.",
      });
    } catch (error) {
      ErrorSwal({
        title: "",
        text:
          error?.data?.message ||
          error?.message ||
          "Error approving beautician.",
      });
    }
  };

  const handleBlock = () => {
    Swal.fire({
      title: "Block Beautician !!",
      text: "Are you sure you want to block this Beautician?",
      showCancelButton: true,
      confirmButtonText: "     Block    ",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#DC2626",
      reverseButtons: true,
    }).then((res) => {
      if (res.isConfirmed) {
        // Implement your block logic here
      }
    });
  };

  if (isLoading) {
    return (
      <LoaderWraperComp
        loader={
          <div>
            {" "}
            <Spin size="large" className="flex justify-center items-center" />
          </div>
        }
      />
    );
  }

  if (error) {
    return <div>Error loading beautician details.</div>;
  }

  return (
    beauticianData && (
      <div className="bg-white rounded-lg">
        {/* Header */}
        <div className="bg-info py-4 px-6 rounded-t-lg flex gap-2.5 items-center text-3xl font-semibold text-white">
          <FaChevronLeft
            onClick={() => navigate(-1)}
            size={24}
            className="mt-1"
            aria-label="Go back"
            cursor={`pointer`}
          />
          <h3>Beautician Details</h3>
        </div>

        {/* Personal Information Section */}
        <h3 className="text-2xl font-medium mt-8 ml-8">
          Personal Information:
        </h3>
        <div className="grid grid-cols-2 gap-2 p-6 items-start">
          <div className="space-y-[18px] divide-y divide-gray-100 p-6 border border-gray-100 rounded-lg shadow-sm pb-5 mt-5 text-[#646464]">
            <div className="flex justify-between">
              <p>Beautician ID :</p>
              <p>#{beauticianData.id.slice(0, 7) + "..."}</p>{" "}
              {/* Ensuring 6-digit Beautician ID */}
            </div>
            <div className="flex justify-between pt-[18px]">
              <p>Beautician Name :</p>
              <p>{beauticianData.user.name}</p>
            </div>

            <div className="flex justify-between pt-[18px]">
              <p>Email :</p>
              <p>{beauticianData.user.email}</p>
            </div>

            <div className="flex justify-between pt-[18px]">
              <p>Post Code :</p>
              <p>{beauticianData.postalCode}</p>
            </div>
            <div className="flex justify-between pt-[18px]">
              <p>Joining Date :</p>
              <p>
                {dayjs(beauticianData.user.createdAt).format("YYYY-MM-DD")}
              </p>{" "}
              {/* Formatting the joining date */}
            </div>
          </div>

          {/* Rating, Available Slots and Other Info */}
          <div className="px-6 pt-6">
            <div className="flex justify-start items-center gap-4">
              <img src={C_LOGO} alt="Celebrity" />
              <p className="text-xl font-semibold">
                {beauticianData.user.name}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 items-start pt-5">
              <div className="space-y-2 text-opacity-95">
                <h1 className="font-bold text-4xl text-slate-600 font-sans">
                  {beauticianData.reviews?.rating
                    ? beauticianData.reviews.rating.toFixed(1)
                    : "N/A"}
                </h1>
                <Rating
                  readonly
                  placeholderRating={beauticianData.reviews?.rating || 0}
                  emptySymbol={<BsStarFill className="text-gray-400 mx-0.5" />}
                  placeholderSymbol={
                    <BsStarFill className="text-yellow-400 mx-0.5" />
                  }
                  fullSymbol={<BsStarFill className="text-yellow-400 mx-0.5" />}
                />
                <p className="text-[#6B6B6B] font-medium">
                  {beauticianData.reviewStatistics?._count.rating} Reviews
                </p>
                <div className="text-lg text-[#646464] font-medium">
                  <h4>Details :</h4>
                </div>
                <p className="text-sm text-[#646464]">{beauticianData.bio}</p>
              </div>

              <div className="space-y-3.5">
                <div className="flex justify-center items-start">
                  <img
                    src={`https://armonia-ifti.sarv.live/${beauticianData.user.image}`}
                    alt="Host"
                    className="w-80 h-60 object-cover"
                  />
                </div>
                {/* Display Available Slots */}
                {beauticianData.availableSlots &&
                  beauticianData.availableSlots.length > 0 && (
                    <div className="mt-4">
                      <p className="font-semibold">Available Slots:</p>
                      <ul>
                        {beauticianData.availableSlots.map((slotObj) => (
                          <li key={slotObj.slot.id}>
                            {slotObj.slot.start} - {slotObj.slot.end}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        {beauticianData.services && beauticianData.services.length > 0 && (
          <div className="p-6">
            <h3 className="text-2xl font-medium mb-4">Services:</h3>
            <ul className="list-disc pl-6">
              {beauticianData.services.map((service) => (
                <li key={service.id}>
                  <p className="font-semibold">{service.name}</p>
                  <p>Price: ${service.price}</p>
                  <p>Time: {service.time} mins</p>
                  <p>Category: {service.categoryName}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Weekly Schedule Section */}
        {beauticianData.weeklySchedules &&
          beauticianData.weeklySchedules.weekDays && (
            <div className="p-6">
              <h3 className="text-2xl font-medium mb-4">Weekly Schedule:</h3>
              <ul className="list-disc pl-6">
                {beauticianData.weeklySchedules.weekDays.map((day) => (
                  <li key={day.id}>{day.dayName}</li>
                ))}
              </ul>
            </div>
          )}

        {/* Reviews Section */}
        <div className="w-[calc(100vw-395px)] overflow-hidden relative px-2 py-4">
          <HostReviewSlider reviews={beauticianData.reviews} />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center py-6 px-11 gap-x-6 mt-6">
          {status === "approved" ? (
            <></>
          ) : (
            <>
              <Button
                style={{ background: "#008E3B" }}
                size="large"
                type="primary"
                className="w-3/12 text-lg"
                onClick={handleApprove}
              >
                Approve
              </Button>
            </>
          )}
        </div>
      </div>
    )
  );
};

export default BeauticianDetails;
