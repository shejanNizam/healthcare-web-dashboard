import { Button, DatePicker, Form, Input, Pagination, Spin, Table } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiAlertCircle } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import DashboardModal from "../../../Components/DashboardModal";
import idImage from "../../../assets/images/id-card.png";
import { useGetAllBeauticiansQuery } from "../../../redux/features/common/commonApi";

export default function Beautician({ status }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState({});
  const [isVerifyModalOpen, setIsVerifyModalOpen] = React.useState(false);
  const [isExcuseMessageyModalOpen, setIsExcuseMessageyModalOpen] =
    React.useState(false);
  const [form] = Form.useForm();
  const [page, setPage] = useState(1); // Track the current page
  const [name, setName] = useState(""); // Name filter
  const [date, setDate] = useState(""); // Date filter

  // Use the current page, name, and date in the query
  const { data, isLoading, error } = useGetAllBeauticiansQuery({
    status,
    page,
    name,
    date,
  });

  // Optionally handle error and loading states
  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full h-64">
        <Spin size="large" />
      </div>
    );
  if (error) {
    return <p>Error loading data!</p>;
  }

  // Map your data to match the table's expected format if needed.
  const tableData =
    data?.data?.map((item) => ({
      key: item.id,
      name: item.user.name,
      email: item.user.email,
      joinDate: dayjs(item.user.createdAt).format("YYYY-MM-DD"),
      id: item.id,
    })) || [];

  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  const onChange = (date, dateString) => {
    setDate(dateString); // Set the selected date as filter
  };

  const onExcuseMessageSubmit = (values) => {
    message.success("Excuse message sent!");
    setIsExcuseMessageyModalOpen(false);
  };

  const columns = [
    {
      title: "#Tr.ID",
      dataIndex: "id",
      key: "id",
      render: (text) => (
        <button
          onClick={(e) => {
            navigator.clipboard.writeText(e.target.innerText);
            toast.success("Copied to clipboard!", {
              position: "bottom-center",
            });
          }}
          className="outline-none active:text-primary transition-all"
        >
          {text.slice(0, 7) + "..."} {/* Truncate the ID if it's too long */}
        </button>
      ),
    },
    {
      title: "Beautician Name",
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
      key: "joinDate",
      dataIndex: "joinDate",
      render: (text) => text, // Already formatted date, no need to reformat here
    },
    {
      title: "Details",
      key: "details",
      render: (data) => (
        <Button
          onClick={() => navigate(`/beautician/${data.id}?status=${status}`)}
          type="text"
          size="middle"
          shape="default"
          className="text-green-playground rounded-2xl"
        >
          <FiAlertCircle size={22} />
        </Button>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg py-[16px]">
      <div className="px-6 pb-5 flex justify-between items-center">
        <h3 className="text-2xl font-sans">Beautician List</h3>
        <div className="flex justify-end gap-x-4">
          {/* Date Picker for filtering by date */}
          <DatePicker
            placeholder="Date"
            style={{ width: "150px" }}
            className="custom-datepicker rounded-full text-[#222222] px-3.5 text-sm"
            onChange={onChange}
          />
          {/* Input for filtering by name */}
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)} // Update name filter
            className="focus:outline-none outline-none rounded-full placeholder:text-[#222222] px-3.5 text-sm w-[170px]"
            placeholder="Beautician Name"
          />
          <Button
            className="bg-primary text-white border-none"
            type="primary"
            shape="circle"
            icon={<IoSearch />}
            onClick={() => setPage(1)} // Reset to page 1 on search
          />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false} // Disable pagination in the table
      />

      {/* Pagination */}
      <div className="flex justify-center p-4">
        <Pagination
          current={page}
          pageSize={10}
          total={data?.pagination?.totalData || 0}
          onChange={(currentPage) => setPage(currentPage)}
          showQuickJumper={true}
          defaultCurrent={1}
          showSizeChanger={false}
        />
      </div>

      {/* Excuse Message Modal */}
      <DashboardModal
        setIsModalOpen={setIsExcuseMessageyModalOpen}
        isModalOpen={isExcuseMessageyModalOpen}
        maxWidth={"400px"}
      >
        <div className="flex flex-col justify-between text-hash font-sans">
          <h6 className="text-center text-2xl py-[18px]">Excuse Message</h6>
          <Form form={form} onFinish={onExcuseMessageSubmit} layout="vertical">
            <Form.Item
              name="message"
              rules={[{ required: true, message: "Message is required!" }]}
            >
              <textarea
                className="w-full border-2 border-primary focus:outline-none rounded-lg px-4 py-2.5"
                rows="5"
                placeholder="Type your message here"
              ></textarea>
            </Form.Item>
            <div className="flex justify-center py-4 px-6 gap-x-6 mt-2">
              <Button size="middle" type="primary" className="w-44 rounded-lg">
                Send
              </Button>
            </div>
          </Form>
        </div>
      </DashboardModal>

      {/* Verify Modal */}
      <DashboardModal
        setIsModalOpen={setIsVerifyModalOpen}
        isModalOpen={isVerifyModalOpen}
        maxWidth={"400px"}
      >
        <div className="flex flex-col justify-between text-hash font-sans">
          <h6 className="font-medium text-center text-2xl py-[18px]">
            Verify Details
          </h6>
          <div className="space-y-[18px]">
            <div>
              <img
                src={idImage}
                alt="ID"
                className="rounded-md max-h-40 mx-auto"
              />
            </div>
            <div>
              <img
                src={idImage}
                alt="ID"
                className="rounded-md max-h-40 mx-auto"
              />
            </div>
          </div>
          <div className="flex justify-center py-4 px-6 gap-x-6 mt-4">
            <Button
              onClick={() => {
                setIsExcuseMessageyModalOpen(true);
                setIsVerifyModalOpen(false);
              }}
              style={{ background: "#EE1D13" }}
              size="middle"
              type="primary"
              className="w-44 rounded-lg"
            >
              Cancel
            </Button>
            <Button size="middle" type="primary" className="w-44 rounded-lg">
              Verify
            </Button>
          </div>
        </div>
      </DashboardModal>

      {/* Details Modal */}
      <DashboardModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        maxWidth={"800px"}
      >
        <div className="flex flex-col justify-between text-hash font-sans">
          <h6 className="font-medium text-center text-2xl pt-[18px]">
            Guest Details
          </h6>
          <div className="space-y-[18px] divide-y divide-gray-100 border-b border-gray-100 pb-5 px-2">
            <div className="flex justify-between pt-[18px]">
              <p>Guest ID :</p>
              <p className="">
                {modalData.id ? modalData.id.slice(0, 7) + "..." : "-"}
              </p>
            </div>
            <div className="flex justify-between pt-[18px]">
              <p>Guest Name :</p>
              <p>{modalData.name || "-"}</p>
            </div>
            <div className="flex justify-between pt-[18px]">
              <p>Email :</p>
              <p>{modalData.email || "-"}</p>
            </div>
            <div className="flex justify-between pt-[18px]">
              <p>Total Use Service :</p>
              <p>9</p>
            </div>
            <div className="flex justify-between pt-[18px]">
              <p>Joining Date :</p>
              <p>{modalData.joinDate || "-"}</p>
            </div>
          </div>
          <div className="flex justify-center py-6 px-11 gap-x-6 mt-6">
            <Button
              style={{ background: "#3A7D99" }}
              size="middle"
              type="primary"
              className="w-44 rounded-lg"
            >
              Okay
            </Button>
            <Button
              style={{ background: "#EE1D23" }}
              size="middle"
              type="primary"
              className="w-44 rounded-lg"
            >
              Block
            </Button>
          </div>
        </div>
      </DashboardModal>
    </div>
  );
}
