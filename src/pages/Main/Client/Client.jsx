import { Avatar, Button, Input, Modal, Pagination, Spin, Table } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import defaultImage from "../../../assets/images/dash-profile.png";
import { useGetAllUserQuery } from "../../../redux/features/user/userApi";

export default function Client() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const { data, isLoading } = useGetAllUserQuery({ page, name });

  const baseImageUrl = import.meta.env.VITE_IMAGE_URL;
  const avatarImage = modalData?.image
    ? `${baseImageUrl}${modalData?.image}`
    : defaultImage;

  useEffect(() => {
    if (data) {
      setFilteredData(data.data);
      setTotalPages(data.pagination.totalPage);
    }
  }, [data]);

  const columns = [
    {
      title: "#Tr.ID",
      dataIndex: "id",
      key: "id",
      render: (text) => (text ? text.slice(0, 7) + "..." : "-"),
    },
    {
      title: "Client Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Join Date",
      key: "createdAt",
      dataIndex: "createdAt",
      render: (text) => (text ? dayjs(text).format("YYYY-MM-DD") : "-"),
    },
    {
      title: "Action",
      key: "action",
      render: (data1) => (
        <Button
          onClick={() => showModal(data1)}
          type="primary"
          shape="round"
          className="px-0 py-0 text-white"
        >
          View Profile
        </Button>
      ),
    },
  ];

  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  const handleSearch = () => {
    setPage(1);
  };

  const handlePaginationChange = (page) => {
    setPage(page);
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
      <div className="bg-button rounded-lg py-4">
        <div className="flex justify-between items-center px-4">
          <h3 className="text-2xl text-white font-semibold">All Users</h3>
          <div className="flex justify-around gap-4">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="focus:outline-none outline-none rounded-full px-4 text-sm w-40"
              placeholder="Name"
              onPressEnter={handleSearch}
            />
            <Button
              className="bg-secondary text-white"
              type="primary"
              shape="circle"
              icon={<IoSearch />}
              onClick={handleSearch}
            />
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={false}
          className="mt-4"
        />
      </div>

      <div className="flex justify-center p-4">
        <Pagination
          current={page}
          showQuickJumper={true}
          showSizeChanger={false}
          total={data?.pagination.totalItem}
          pageSize={10}
          onChange={handlePaginationChange}
          className="text-white"
          totalPage={totalPages}
        />
      </div>

      {/* Modal */}
      <Modal
        title={`User Information - ${modalData.name}`}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalOpen(false)}>
            OK
          </Button>,
        ]}
        centered
        width={400}
      >
        <div className="flex justify-center">
          <Avatar src={avatarImage} size={80} />
        </div>

        <div className="space-y-4">
          {/* <p>
            <strong>Tr.ID.:</strong> #{modalData?.id?.slice(0, 6)}
          </p> */}
          <p>
            <strong>Full Name:</strong> {modalData.name}
          </p>
          <p>
            <strong>Email:</strong> {modalData.email}
          </p>
          <p>
            <strong>Phone:</strong> {modalData.phone ? modalData.phone : "N/A"}
          </p>
        </div>
      </Modal>
    </>
  );
}
