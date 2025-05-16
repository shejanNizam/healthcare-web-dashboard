import { Button, DatePicker, Pagination, Spin, Table } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useGetAllSessionQuery } from "../../../redux/features/session/sessionApi";

export default function AvailableSession({ type }) {
  const [page, setPage] = useState(1);

  const [date, setDate] = useState("");

  const { data, isLoading } = useGetAllSessionQuery({
    type,
    page,

    date,
  });

  const columns = [
    {
      title: "SI No.",
      key: "index",
      render: (_, __, index) => `#${index + 1 + (page - 1) * 10}`,
      align: "center",
    },
    {
      title: "Session Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (price) => `$${price}`,
    },
    {
      title: "Date & Time",
      key: "dateTime",
      align: "center",
      render: (record) => (
        <div className="flex justify-center items-center gap-2">
          <div>{dayjs(record.date).format("MMM DD, YYYY,")}</div>
          <div>{record.time}</div>
        </div>
      ),
    },
    {
      title: "Registered Users",
      dataIndex: "totalRegisteredMembers",
      key: "totalRegisteredMembers",
      align: "center",
    },
  ];

  const handleDateChange = (date, dateString) => {
    setDate(dateString);
    setPage(1);
  };

  const sessionData = data?.data || [];
  const paginationData = data?.pagination || { totalItem: 0, totalPage: 1 };

  // Update pagination logic based on totalPage from the response
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
          <h3 className="text-2xl text-white font-semibold">
            Available Sessions
          </h3>
          <div className="flex justify-around gap-4">
            <DatePicker
              placeholder="Select Date"
              style={{ width: "150px" }}
              className="custom-datepicker rounded-full text-sm"
              onChange={handleDateChange}
            />
            {/* <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="focus:outline-none outline-none rounded-full px-4 text-sm w-40"
              placeholder="Search Session"
              onPressEnter={() => setPage(1)}
            /> */}
            <Button
              className="bg-secondary text-white"
              type="primary"
              shape="circle"
              icon={<IoSearch />}
              onClick={() => setPage(1)}
            />
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={sessionData}
          pagination={false}
          className="mt-4"
          rowKey="id"
        />
      </div>

      <div className="flex justify-center p-4">
        <Pagination
          current={page}
          total={paginationData.totalItem}
          pageSize={10}
          onChange={handlePaginationChange}
          showQuickJumper
          showSizeChanger={false}
          className="text-white"
          totalPage={paginationData.totalPage}
        />
      </div>

      {/* Modal removed as per your requirement */}
    </>
  );
}
