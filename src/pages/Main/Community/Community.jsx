import {
  Button,
  Card,
  Col,
  Image,
  message,
  Modal,
  Pagination,
  Row,
  Spin,
} from "antd";
import { useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  useDeleteCommunityMutation,
  // useDeleteCommunityMutation,
  useGetAllCommunityQuery,
} from "../../../redux/features/community/communityApi";
import { ErrorSwal, SuccessSwal } from "../../../utils/allSwalFire";

export default function Community() {
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useGetAllCommunityQuery();
  const pagination = data?.pagination || {};

  const [deleteCommunity] = useDeleteCommunityMutation();

  // const [deleteCommunity] = useDeleteCommunityMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteCommunityId, setDeleteCommunityId] = useState(null);

  const baseImageUrl = import.meta.env.VITE_IMAGE_URL;

  const handleDelete = (id) => {
    setDeleteCommunityId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteCommunity(deleteCommunityId).unwrap();
      SuccessSwal({
        title: "",
        text: response?.message || "Category deleted successfully!",
      });
      refetch();
      setIsModalOpen(false);
    } catch (error) {
      ErrorSwal({
        title: "",
        text: error?.message || "Failed to delete category!",
      });
    }

    setCommunities(
      daat?.data?.filter((community) => community.id !== deleteCommunityId)
    );
    message.success("Community deleted successfully!");
    setIsModalOpen(false);
    setDeleteCommunityId(null);
  };

  const handleDetails = (id) => {
    navigate(`/community/${id}`);
  };

  const handlePageChange = (page) => {
    console.log("Page changed to: ", page);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <h3 className="text-2xl font-semibold mb-6">Community</h3>

      <Row gutter={[20, 20]}>
        {data?.data?.map((community) => (
          <Col key={community.id} span={8}>
            <Card
              hoverable
              cover={
                <Image
                  alt={community.name}
                  src={baseImageUrl + community?.coverPhoto}
                  style={{
                    borderRadius: "16px",
                    padding: "8px",
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                  }}
                />
              }
              className="relative"
            >
              <div className="absolute top-2 right-2 flex gap-2 p-4">
                <Button
                  icon={<IoMdInformationCircleOutline />}
                  type="primary"
                  shape="circle"
                  size="large"
                  onClick={() => handleDetails(community.id)}
                />
                <Button
                  icon={<AiTwotoneDelete />}
                  type="default"
                  shape="circle"
                  size="large"
                  onClick={() => handleDelete(community.id)}
                />
              </div>

              {/* <div className="absolute top-60 left-52 flex justify-center items-center mt-4">
                <img
                  src={baseImageUrl + community?.photo}
                  alt={community.name}
                  preview={false}
                  className="rounded-full w-24 h-24 border-4 border-white"
                />
              </div> */}

              <div
                onClick={() => handleDetails(community.id)}
                className="text-center mt-4"
              >
                <h4 className="font-semibold text-lg">{community.name}</h4>
                <p className="text-sm">{community?.totalMembers} Members</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <Pagination
          current={pagination.currentPage}
          pageSize={pagination.limit}
          total={pagination.totalItem}
          onChange={handlePageChange}
          showSizeChanger={false}
          showQuickJumper
        />
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Deletion"
        open={isModalOpen}
        onOk={confirmDelete}
        onCancel={() => setIsModalOpen(false)}
        okText="Yes, Delete"
        cancelText="Cancel"
        centered
      >
        <p>Are you sure you want to delete this community?</p>
      </Modal>
    </>
  );
}
