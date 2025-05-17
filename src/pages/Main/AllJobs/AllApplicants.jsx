// export default function AllApplicants() {
//   return (
//     <>
//       <h3>AllApplicants</h3>
//     </>
//   );
// }

import { Button, DatePicker, Pagination, Spin, Table } from "antd";
import { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function AllApplicants({ type = "international" }) {
  const [page, setPage] = useState(1);
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Dummy data to simulate API response
  const dummyData = {
    data: [
      {
        id: "1",
        userId: "3637823",
        userName: "Jane Cooper",
        email: "bryan@gmail.com",
        phone: "5485787633",
      },
      {
        id: "2",
        userId: "3637823",
        userName: "Jane Cooper",
        email: "bryan@gmail.com",
        phone: "5485787633",
      },
      {
        id: "3",
        userId: "3637823",
        userName: "Jane Cooper",
        email: "bryan@gmail.com",
        phone: "5485787633",
      },
      {
        id: "4",
        userId: "3637823",
        userName: "Jane Cooper",
        email: "bryan@gmail.com",
        phone: "5485787633",
      },
      {
        id: "5",
        userId: "3637823",
        userName: "Jane Cooper",
        email: "bryan@gmail.com",
        phone: "5485787633",
      },
      {
        id: "6",
        userId: "3637823",
        userName: "Jane Cooper",
        email: "bryan@gmail.com",
        phone: "5485787633",
      },
      {
        id: "7",
        userId: "3637823",
        userName: "Jane Cooper",
        email: "bryan@gmail.com",
        phone: "5485787633",
      },
      {
        id: "8",
        userId: "3637823",
        userName: "Jane Cooper",
        email: "bryan@gmail.com",
        phone: "5485787633",
      },
      {
        id: "9",
        userId: "3637823",
        userName: "Jane Cooper",
        email: "bryan@gmail.com",
        phone: "5485787633",
      },
      {
        id: "10",
        userId: "3637823",
        userName: "Jane Cooper",
        email: "bryan@gmail.com",
        phone: "5485787633",
      },
    ],
    pagination: {
      totalItem: 100,
      totalPage: 10,
    },
  };

  // Column definitions for the table
  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      align: "center",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Phone No.",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button
          className="bg-blue-500 text-white hover:bg-blue-600"
          onClick={() => handleDetailsClick(record.id)}
        >
          Details
        </Button>
      ),
    },
  ];

  const handleDateChange = (date, dateString) => {
    setDate(dateString);
    setPage(1);
  };

  const handleDetailsClick = (id) => {
    navigate(`/all-jobs/all-applicants/details/${id}`);
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

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="bg-button rounded-lg py-4 shadow-md">
        <div className="flex justify-between items-center p-4">
          {/* <h3 className="text-2xl text-white font-semibold">All Applicants</h3> */}
          <div className="text-white shadow-sm px-4 flex items-center">
            <button
              onClick={handleBack}
              className="mr-2 cursor-pointer"
              aria-label="Go back"
            >
              <FiChevronLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-bold ">Details of this Job</h1>
          </div>
          <div className="flex justify-around gap-4">
            <DatePicker
              placeholder="Select Date"
              style={{ width: "150px" }}
              className="rounded-full"
              onChange={handleDateChange}
            />
            <Button
              className="bg-primary/50 text-white"
              type="primary"
              icon={<IoSearch />}
              onClick={() => setPage(1)}
            />
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={dummyData.data}
          pagination={false}
          rowKey="id"
        />
      </div>

      <div className="flex justify-center p-4">
        <Pagination
          current={page}
          total={dummyData.pagination.totalItem}
          pageSize={10}
          onChange={handlePaginationChange}
          showQuickJumper
          showSizeChanger={false}
        />
      </div>
    </>
  );
}
