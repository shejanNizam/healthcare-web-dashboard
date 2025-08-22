import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Modal } from "antd";
import { useState } from "react";

import { Input, message } from "antd";

const { TextArea } = Input;

export default function WhatWeDo() {
  const [whatWeDoForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [whatWeDoItems, setWhatWeDoItems] = useState([
    "Manage service",
    "VMS technology",
    "Business intelligence",
  ]);

  const showModal = () => {
    setIsModalVisible(true);
    whatWeDoForm.resetFields();
  };

  const handleDeleteItem = (index) => {
    Modal.confirm({
      title: "Delete Item",
      content: "Are you sure you want to delete this item?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        setWhatWeDoItems(whatWeDoItems.filter((_, i) => i !== index));
        message.success("Item deleted successfully");
      },
    });
  };

  const handleModalSubmit = (values) => {
    if (values.text) {
      setWhatWeDoItems([...whatWeDoItems, values.text]);
      message.success("Item added successfully");
    }
    setIsModalVisible(false);
    whatWeDoForm.resetFields();
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
          {whatWeDoItems.map((item, index) => (
            <div
              key={index}
              className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border"
            >
              <div className="flex-1 mr-4">
                <div className="font-medium text-gray-800 mb-1">{item}</div>
              </div>
              <div className="flex space-x-2 flex-shrink-0">
                <Button
                  size="small"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteItem(index)}
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
            name="text"
            label="Text"
            rules={[{ required: true, message: "Please enter the text" }]}
          >
            <Input placeholder="Enter text" size="large" />
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
