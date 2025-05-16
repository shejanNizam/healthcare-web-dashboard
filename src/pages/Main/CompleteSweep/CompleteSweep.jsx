import { Avatar, Button, Form, Input, Table } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function CompleteSweep() {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });
  const [searchName, setSearchName] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  const [form] = Form.useForm();

  // Sample data structure for the products
  const data = [
    {
      id: "1",
      productName: "Headphone",
      category: "Electrical",
      boostPrice: "$4",
      deadline: "03-16-25",
      winner: "See Winner",
    },
    {
      id: "2",
      productName: "Sun glass Guchi",
      category: "Grocery",
      boostPrice: "$5",
      deadline: "03-16-25",
      winner: "See Winner",
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

  const handleShowWinnerList = (id) => {
    // Use navigate to go to the winner details page and pass the id as part of the URL
    navigate(`/complete-sweep/${id}`);
  };

  const columns = [
    {
      title: "SL No",
      key: "serial",
      render: (_, __, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
      align: "center",
    },
    {
      title: "Image",
      key: "image",
      render: (record) => <Avatar src={record.profileImage} size={40} />,
      align: "center",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      align: "center",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      align: "center",
    },
    {
      title: "Boost Price",
      dataIndex: "boostPrice",
      key: "boostPrice",
      align: "center",
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
      render: (text) => dayjs(text).format("MM-DD-YY"),
      align: "center",
    },
    {
      title: "Winner",
      key: "winner",
      render: (record) => (
        <Button
          type="primary"
          shape="round"
          onClick={() => handleShowWinnerList(record.id)} // Pass id to navigate
        >
          {record.winner}
        </Button>
      ),
      align: "center",
    },
  ];

  return (
    <div className="bg-darkGreen rounded-lg">
      <div className="flex justify-between items-center bg-button p-4 rounded-t-md text-white">
        <h2 className="text-2xl font-semibold">Complete Sweepstakes</h2>
        <div className="flex gap-4 items-center">
          <Input
            placeholder="Search Name..."
            value={searchName}
            onChange={(e) => {
              setSearchName(e.target.value);
              setPagination((state) => ({ ...state, current: 1 }));
            }}
            style={{ width: 150 }}
          />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.id}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: data.length,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "30", "40", "50"],
        }}
        onChange={handleTableChange}
        className="mt-4"
      />
    </div>
  );
}
