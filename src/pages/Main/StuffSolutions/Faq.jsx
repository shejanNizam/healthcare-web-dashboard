import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Modal } from "antd";
import { useState } from "react";

import { Input, Select, message } from "antd";

const { TextArea } = Input;
const { Option } = Select;

export default function Faq({ faqs }) {
  const [faqForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  //   const [editingFaqIndex, setEditingFaqIndex] = useState(null);

  console.log(faqs);

  const showModal = () => {
    setIsModalVisible(true);
    // setEditingFaqIndex(null);
    faqForm.resetFields();
  };

  //   const handleEditFaq = (index) => {
  //     setEditingFaqIndex(index);
  //     setIsModalVisible(true);
  //     faqForm.setFieldsValue(faqs[index]);
  //   };

  const handleDeleteFaq = (index) => {
    Modal.confirm({
      title: "Delete FAQ",
      content: "Are you sure you want to delete this FAQ?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        setFaqs(faqs.filter((_, i) => i !== index));
        message.success("FAQ deleted successfully");
      },
    });
  };

  const handleFaqModalSubmit = (values) => {
    console.log(values);
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    faqForm.resetFields();
  };
  return (
    <>
      {/* FAQ Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-medium text-gray-700">FAQ</h3>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showModal}
            size="small"
            className="bg-primary hover:bg-primary/80"
          >
            Add FAQ
          </Button>
        </div>

        <div className="space-y-3">
          {faqs?.map((faq, index) => (
            <div
              key={index}
              className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border"
            >
              <div className="flex-1 mr-4">
                <div className="font-medium text-gray-800 mb-1">
                  {faq.question}
                </div>
                <div className="text-sm text-gray-600">{faq.ans}</div>
              </div>
              <div className="flex space-x-2 flex-shrink-0">
                {/* <Button
                  size="small"
                  icon={<EditOutlined />}
                  onClick={() => handleEditFaq(index)}
                  className="text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                  Edit
                </Button> */}
                <Button
                  size="small"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteFaq(index)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Modal */}
      <Modal
        // title={editingFaqIndex !== null ? "Edit FAQ" : "Add FAQ"}
        title={"Add FAQ"}
        open={isModalVisible}
        onCancel={handleModalCancel}
        // okText={editingFaqIndex !== null ? "Update" : "Add"}
        // cancelText="Cancel"
        footer={null}
        centered
        width={600}
      >
        <Form
          form={faqForm}
          layout="vertical"
          className="mt-4"
          onFinish={handleFaqModalSubmit}
        >
          <Form.Item
            name="question"
            label="Question"
            rules={[{ required: true, message: "Please enter the question" }]}
          >
            <Input placeholder="Enter your question" size="large" />
          </Form.Item>

          <Form.Item
            name="answer"
            label="Answer"
            rules={[{ required: true, message: "Please enter the answer" }]}
          >
            <TextArea rows={4} placeholder="Enter the answer" />
          </Form.Item>

          {/* Submit Button */}
          <div className="pt-6">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              //   loading={loading}
              className="w-full bg-primary hover:bg-primary/80 h-12 text-base font-medium"
              block
            >
              {/* {loading ? "Submitting..." : "Submit"} */}
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
