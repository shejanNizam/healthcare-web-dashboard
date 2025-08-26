import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Modal } from "antd";
import { useState } from "react";

import { Input, message } from "antd";
import {
  useAddWhatWeDoMutation,
  useDeleteWhatWeDoMutation,
} from "../../../redux/features/stuff/stuffApi";

export default function WhatWeDo({ stuff }) {
  const [whatWeDoForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const whatWeDoItems = stuff?.what_we_do;
  console.log(whatWeDoItems);

  const [addWhatWeDo] = useAddWhatWeDoMutation();
  const [deleteWhatWeDo] = useDeleteWhatWeDoMutation();

  // const [whatWeDoItems, setWhatWeDoItems] = useState([
  //   "Manage service",
  //   "VMS technology",
  //   "Business intelligence",
  // ]);

  const showModal = () => {
    setIsModalVisible(true);
    whatWeDoForm.resetFields();
  };

  const handleDeleteItem = async (id) => {
    Modal.confirm({
      title: "Delete type",
      content: "Are you sure you want to delete this type?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const payload = {
            stuffId: stuff._id,
            doId: id,
          };
          await deleteWhatWeDo(payload).unwrap();
          message.success("Type deleted successfully");
        } catch (error) {
          message.error(
            error.data?.message || "Failed to delete. Please try again."
          );
        }
      },
    });
  };

  const handleModalSubmit = async (values) => {
    try {
      const payload = {
        stuffId: stuff?._id,
        param: true,
        body: values,
      };
      await addWhatWeDo(payload).unwrap();
      setIsModalVisible(false);
      message.success("What we do type added!");
    } catch (error) {
      message.error(
        error.data?.message || "Failed to Add WhatWeDo. Please try again!"
      );
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    whatWeDoForm.resetFields();
  };

  return (
    <>
      {/* What We Do Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-medium text-gray-700">
            Services/Features
          </h3>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showModal}
            size="small"
            className="bg-primary hover:bg-primary/80"
          >
            Add Item
          </Button>
        </div>

        <div className="space-y-3">
          {whatWeDoItems?.map((item) => (
            <div
              key={item?._id}
              className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border"
            >
              <div className="flex-1 mr-4">
                <div className="font-medium text-gray-800 mb-1">
                  {item?.type}
                </div>
              </div>
              <div className="flex space-x-2 flex-shrink-0">
                <Button
                  size="small"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteItem(item._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Item Modal */}
      <Modal
        title={"Add Item"}
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
        centered
        width={600}
      >
        <Form
          form={whatWeDoForm}
          layout="vertical"
          className="mt-4"
          onFinish={handleModalSubmit}
        >
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: "Please enter the text" }]}
          >
            <Input placeholder="Enter type" size="large" />
          </Form.Item>

          {/* Submit Button */}
          <div className="pt-6">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full bg-primary hover:bg-primary/80 h-12 text-base font-medium"
              block
            >
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
