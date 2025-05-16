"use client";

import { Button, Card, Image, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCommunityByIdQuery } from "../../../redux/features/community/communityApi";

import { Avatar } from "antd";
import { FaArrowLeft } from "react-icons/fa6";

const baseImageUrl = import.meta.env.VITE_IMAGE_URL;

export default function GroupDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading } = useGetCommunityByIdQuery(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-64">
        <Spin size="large" />
      </div>
    );
  }

  // Extract the community data from the API response
  const community = data?.data || {};
  console.log(community?.members?.length);

  const handleClickSeeMore = () => {
    navigate(`/community/community-all-members/${id}`);
    console.log("first");
  };

  return (
    <div className="p-2">
      <div className="flex items-center gap-2 mb-6">
        <Button
          type="text"
          onClick={() => navigate(-1)}
          icon={
            <span className="text-lg">
              {" "}
              <FaArrowLeft />{" "}
            </span>
          }
          className="flex items-center justify-center w-8 h-8 hover:bg-gray-100 rounded-full"
        />
        <h2 className="text-2xl font-bold">Community Details</h2>
      </div>

      <Card
        className="rounded-lg shadow-sm"
        cover={
          <Image
            alt={community.name}
            src={baseImageUrl + community.communityImage}
            className="rounded-t-lg"
            style={{
              padding: "8px",
              width: "100%",
              height: "320px",
              objectFit: "cover",
            }}
          />
        }
        bodyStyle={{ padding: "24px" }}
      >
        {/* Group Name */}
        <h3 className="text-3xl font-semibold mb-4">
          {community.communityName}
          <p className="text-sm">{community?.totalMembers} Members</p>
        </h3>

        <div className="pt-4">
          <h4 className=" text-lg font-semibold">Description: </h4>
          <p className="pl-4"> {community?.communityDescription} </p>
        </div>
      </Card>

      {/* Group Creator */}
      <div className="flex items-center gap-12 py-4 pl-12">
        <div>
          <h3 className="text-sm text-gray-500">Group Creator</h3>
          <div className="flex items-center gap-2">
            <Avatar
              size={48}
              src={baseImageUrl + community?.creator?.image?.publicFileURL}
            />
            <div>
              <p>{community?.creator?.name}</p>
              <p>
                {" "}
                {community?.creator?.email
                  ? community?.creator?.email
                  : "N/A"}{" "}
              </p>
            </div>
          </div>
        </div>
        {community?.members !== null && (
          <div className="pl-60">
            <h3 className="text-sm text-gray-500">All Members</h3>
            {community?.members?.length === 1 ? (
              <>
                <Avatar.Group
                  className="flex items-center"
                  size="large"
                  max={{
                    style: {
                      color: "#f56a00",
                      backgroundColor: "#fde3cf",
                      cursor: "pointer",
                    },
                    popover: { trigger: "click" },
                  }}
                >
                  <Avatar
                    src={
                      community?.members !== null &&
                      baseImageUrl + community?.members[0]?.image
                    }
                    className="bg-primary"
                  ></Avatar>

                  <button onClick={handleClickSeeMore}>
                    <p className="pl-4 font-semibold hover:font-bold hover:text-primary">
                      {community.totalMembers} more...
                    </p>
                  </button>
                </Avatar.Group>
              </>
            ) : (
              <>
                {community?.members?.length === 2 ? (
                  <>
                    <Avatar.Group
                      className="flex items-center"
                      size="large"
                      max={{
                        style: {
                          color: "#f56a00",
                          backgroundColor: "#fde3cf",
                          cursor: "pointer",
                        },
                        popover: { trigger: "click" },
                      }}
                    >
                      <Avatar
                        src={
                          community?.members !== null &&
                          baseImageUrl + community?.members[0]?.image
                        }
                        className="bg-primary"
                      ></Avatar>
                      <Avatar
                        src={
                          community?.members !== null &&
                          baseImageUrl + community?.members[1]?.image
                        }
                        className="bg-primary"
                      ></Avatar>
                      <button onClick={handleClickSeeMore}>
                        <p className="pl-4 font-semibold hover:font-bold hover:text-primary">
                          {community.totalMembers} more...
                        </p>
                      </button>
                    </Avatar.Group>
                  </>
                ) : (
                  <>
                    <Avatar.Group
                      className="flex items-center"
                      size="large"
                      max={{
                        style: {
                          color: "#f56a00",
                          backgroundColor: "#fde3cf",
                          cursor: "pointer",
                        },
                        popover: { trigger: "click" },
                      }}
                    >
                      <Avatar
                        src={
                          community?.members !== null &&
                          baseImageUrl + community?.members[0]?.image
                        }
                        className="bg-primary"
                      ></Avatar>
                      <Avatar
                        src={
                          community?.members !== null &&
                          baseImageUrl + community?.members[1]?.image
                        }
                        className="bg-primary"
                      ></Avatar>
                      <Avatar
                        src={
                          community?.members !== null &&
                          baseImageUrl + community?.members[2]?.image
                        }
                        className="bg-primary"
                      ></Avatar>

                      <button onClick={handleClickSeeMore}>
                        <p className="pl-4 font-semibold hover:font-bold hover:text-primary">
                          {community.totalMembers} more...
                        </p>
                      </button>
                    </Avatar.Group>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
