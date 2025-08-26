import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Modal } from "antd";
import { useState } from "react";

import { Input, Select, message } from "antd";
import {
  useAddFaqMutation,
  useDeleteFaqMutation,
} from "../../../redux/features/stuff/stuffApi";

const { TextArea } = Input;
const { Option } = Select;

export default function Faq({ stuff }) {
  const [faqForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  //   const [editingFaqIndex, setEditingFaqIndex] = useState(null);

  const faqs = stuff?.FAQ;

  const [addFaq, { isLoading: isLoadingAddFaq }] = useAddFaqMutation();
  const [deleteFaq] = useDeleteFaqMutation();

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

  const handleDeleteFaq = async (id) => {
    console.log(id);
    Modal.confirm({
      title: "Delete FAQ",
      content: "Are you sure you want to delete this FAQ?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        // setFaqs(faqs.filter((_, i) => i !== index));
        try {
          console.log(id);
          const payload = {
            stuffId: stuff?._id,
            faqId: id,
          };
          await deleteFaq(payload).unwrap();
          message.success("FAQ deleted successfully");
        } catch (error) {
          message.error(
            error.data?.message || "Failed to delete. Please try again."
          );
        }
      },
    });
  };

  const handleFaqModalSubmit = async (values) => {
    try {
      const payload = {
        stuffId: stuff?._id,
        param: true,
        body: values,
      };
      // console.log(payload);

      await addFaq(payload).unwrap();
      setIsModalVisible(false);
      message.success("Faq added successfully!");
    } catch (error) {
      console.log(error);
      message.error(
        error.data?.message || "Failed to Add Faq. Please try again."
      );
    }
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
          {faqs?.map((faq) => (
            <div
              key={faq._id}
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
                  onClick={() => handleDeleteFaq(faq?._id)}
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
            name="newQuestion"
            label="Question"
            rules={[{ required: true, message: "Please enter the question" }]}
          >
            <Input placeholder="Enter your question" size="large" />
          </Form.Item>

          <Form.Item
            name="ans"
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
              loading={isLoadingAddFaq}
              className="w-full bg-primary hover:bg-primary/80 h-12 text-base font-medium"
              block
            >
              {isLoadingAddFaq ? "Submitting..." : "Submit"}
              {/* Submit */}
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
