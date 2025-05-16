import { Avatar, Button, Modal, Table } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PageHeading from "../../../Components/PageHeading";
import { FaFacebook, FaInstagram } from "react-icons/fa6";

export default function SweepWinnerList() {
  const { id } = useParams(); // Extract the ID from the URL

  // Dummy data for the winner list
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });
  const [selectedWinner, setSelectedWinner] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const winnerData = [
    {
      id: 1,
      name: "Rabbi Hasan",
      email: "rabbi123@gmail.com",
      phone: "+8801634426758",
      joiningDate: "03-16-25",
      profileImage: "https://via.placeholder.com/150", // Dummy image
    },
    {
      id: 2,
      name: "Maya Roy",
      email: "maya456@gmail.com",
      phone: "+8801634426759",
      joiningDate: "03-16-25",
      profileImage: "https://via.placeholder.com/150", // Dummy image
    },
    {
      id: 3,
      name: "John Doe",
      email: "john.doe@gmail.com",
      phone: "+8801634426760",
      joiningDate: "03-16-25",
      profileImage: "https://via.placeholder.com/150", // Dummy image
    },
    // Add more rows as needed
  ];

  const handleTableChange = (pag) => {
    setPagination({
      ...pagination,
      current: pag.current,
      pageSize: pag.pageSize,
    });
  };

  const handleShowDetails = (id) => {
    const winner = winnerData.find((item) => item.id === id);
    setSelectedWinner(winner);
    setIsModalVisible(true); // Show modal when "See Details" is clicked
  };

  const handleModalClose = () => {
    setIsModalVisible(false); // Close modal
  };

  const columns = [
    {
      title: "S. No",
      key: "serial",
      render: (_, __, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Joining Date",
      dataIndex: "joiningDate",
      key: "joiningDate",
      render: (text) => dayjs(text).format("MM-DD-YY"),
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Button
          type="primary"
          shape="round"
          onClick={() => handleShowDetails(record.id)} // Show winner details modal
        >
          See Details
        </Button>
      ),
      align: "center",
    },
  ];

  return (
    <div className="p-4">
      <PageHeading
        title={"Winner List"}
        backPath={-1}
        // disbaledBackBtn={true}
        className={"px-10 border-b border-primary text-button py-6"}
      />
      {/* <h3 className="text-2xl font-semibold mb-4">Winner List</h3> */}

      <Table
        columns={columns}
        dataSource={winnerData}
        rowKey={(record) => record.id}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: winnerData.length,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
        }}
        onChange={handleTableChange}
        className="mt-4"
      />

      {/* Modal to show winner details */}
      <Modal
        centered
        title={`User Information - ${selectedWinner?.name}`}
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="back" onClick={handleModalClose}>
            OK
          </Button>,
        ]}
        width={500}
      >
        <div className="flex justify-center">
          <Avatar src={selectedWinner?.profileImage} size={80} />
        </div>
        <div className="mt-4">
          <p>
            <strong>Si No.:</strong> #{selectedWinner?.id}
          </p>
          <p>
            <strong>Full name:</strong> {selectedWinner?.name}
          </p>
          <p>
            <strong>Email:</strong> {selectedWinner?.email}
          </p>
          <p>
            <strong>Phone:</strong> {selectedWinner?.phone}
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Button shape="circle" icon={<FaFacebook />} />
            <Button shape="circle" icon={<FaInstagram />} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
