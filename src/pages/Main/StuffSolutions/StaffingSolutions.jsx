import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  message,
} from "antd";
import { useState } from "react";

const { TextArea } = Input;
const { Option } = Select;

export default function StaffingSolutions() {
  const [form] = Form.useForm();
  const [faqForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingFaqIndex, setEditingFaqIndex] = useState(null);

  const [faqs, setFaqs] = useState([
    {
      question: "How can I pay for my order?",
      answer: "We accept all major credit cards and PayPal.",
    },
    {
      question: "How can I track a product?",
      answer:
        "You will receive a tracking number via email once your order ships.",
    },
    {
      question: "How can I return a product?",
      answer: "Items can be returned within 30 days of purchase.",
    },
    {
      question: "What is your refund policy?",
      answer: "Full refunds are provided for returns within 30 days.",
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days.",
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to most countries worldwide.",
    },
    {
      question: "How can I contact customer support?",
      answer: "You can reach us via email or live chat 24/7.",
    },
  ]);

  // Mock API call function
  const submitToAPI = async (data) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Replace this URL with your actual API endpoint
    const response = await fetch("/api/staffing-solutions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to submit form");
    }

    return response.json();
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      // Prepare the payload with all form data including FAQs
      const payload = {
        ...values,
        faqs: faqs,
        submittedAt: new Date().toISOString(),
      };

      console.log("Submitting payload:", payload);

      // Call the API
      const result = await submitToAPI(payload);

      message.success("Form submitted successfully!");
      console.log("API Response:", result);

      // Optionally reset form after successful submission
      // form.resetFields();
    } catch (error) {
      console.error("Submission error:", error);
      message.error("Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
    setEditingFaqIndex(null);
    faqForm.resetFields();
  };

  const handleEditFaq = (index) => {
    setEditingFaqIndex(index);
    setIsModalVisible(true);
    faqForm.setFieldsValue(faqs[index]);
  };

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

  const handleModalOk = () => {
    faqForm.validateFields().then((values) => {
      if (editingFaqIndex !== null) {
        // Edit existing FAQ
        const updatedFaqs = [...faqs];
        updatedFaqs[editingFaqIndex] = values;
        setFaqs(updatedFaqs);
        message.success("FAQ updated successfully");
      } else {
        // Add new FAQ
        setFaqs([...faqs, values]);
        message.success("FAQ added successfully");
      }
      setIsModalVisible(false);
      faqForm.resetFields();
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    faqForm.resetFields();
  };

  const uploadProps = {
    name: "file",
    multiple: true,
    beforeUpload: (file) => {
      // Prevent automatic upload, handle files manually
      return false;
    },
    onChange(info) {
      console.log("Upload info:", info);
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="">
          {/* Left Column - Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Details Section */}
            <Card className="shadow-sm">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Nsrsing and Allied health
              </h2>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className="space-y-4"
              >
                <div className="mb-6">
                  <h3 className="text-base font-medium text-gray-700 mb-3">
                    Service alias
                  </h3>
                  <Form.Item
                    name="serviceAlias"
                    rules={[
                      {
                        required: true,
                        message: "Please enter service alias",
                      },
                    ]}
                  >
                    <Input placeholder="Enter service alias" size="large" />
                  </Form.Item>
                </div>

                {/* Banner Section */}
                <div className="border p-4 rounded-md">
                  <h3 className="text-base font-medium text-gray-700 mb-3">
                    Banner Section
                  </h3>
                  <Form.Item
                    label="Banner Heading"
                    name="bannerHeading"
                    rules={[
                      {
                        required: true,
                        message: "Please enter banner heading",
                      },
                    ]}
                  >
                    <Input placeholder="Enter banner heading" size="large" />
                  </Form.Item>

                  {/* Tagline */}
                  <Form.Item
                    label="Tagline"
                    name="tagLine"
                    rules={[
                      { required: true, message: "Please enter tagline" },
                    ]}
                  >
                    <Input placeholder="Enter tagline" size="large" />
                  </Form.Item>
                </div>

                <div className="border p-4 rounded-md">
                  {/* Title */}
                  <Form.Item
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: "Please enter title" }]}
                  >
                    <Input placeholder="Enter title" size="large" />
                  </Form.Item>

                  {/* Description */}
                  <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                      { required: true, message: "Please enter description" },
                    ]}
                  >
                    <TextArea
                      rows={6}
                      placeholder="Enter detailed description"
                    />
                  </Form.Item>
                </div>

                {/* Why Choose Us */}
                <Form.Item label="Why choose us" name="whyChooseUs">
                  <TextArea
                    rows={4}
                    placeholder="Explain why customers should choose your service"
                  />
                </Form.Item>

                <Divider />

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
                    {faqs.map((faq, index) => (
                      <div
                        key={index}
                        className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border"
                      >
                        <div className="flex-1 mr-4">
                          <div className="font-medium text-gray-800 mb-1">
                            {faq.question}
                          </div>
                          <div className="text-sm text-gray-600">
                            {faq.answer}
                          </div>
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

                {/* Tags */}
                <Form.Item name="tags" label="Tags">
                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Add tags (press enter to add)"
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                <Divider />

                {/* Search Engine Listing */}

                <h1 className="text-2xl font-bold pb-6">
                  Search Engine Listing
                </h1>

                <h3 className="text-xl text-primary ">Cenmhealthcare</h3>
                <p className="text-primary text-xs pb-6">
                  https//: cenmhealtcare.com
                </p>
                {/* <link className="" rel="stylesheet" href="https//: cenmhealtcare.com" /> */}
                <p className="text-primary text-xl font-semibold pb-2">
                  Staff for hospitals, clinics, and care homes across the UK.
                </p>
                <p className="pb-6">
                  Reliable healthcare staffing agency providing qualified
                  nurses, caregivers, and medical staff for hospitals, clinics,
                  and care homes across the UK.
                </p>

                {/* paeg title */}
                <Form.Item name="pageTitle" label="Page title">
                  <Input placeholder="Enter page title" size="large" />
                </Form.Item>
                {/* meta descrition */}
                <Form.Item name="metaDescription" label="Meta description">
                  <TextArea
                    rows={3}
                    placeholder="Enter meta description for search engines"
                  />
                </Form.Item>
                {/* url handler */}
                <Form.Item name="urlHandle" label="URL handle">
                  <Input
                    placeholder="Enter URL handle"
                    size="large"
                    addonBefore="https://yoursite.com/services/"
                  />
                </Form.Item>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base font-medium"
                    block
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </Form>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQ Modal */}
      <Modal
        title={editingFaqIndex !== null ? "Edit FAQ" : "Add FAQ"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText={editingFaqIndex !== null ? "Update" : "Add"}
        cancelText="Cancel"
        width={600}
      >
        <Form form={faqForm} layout="vertical" className="mt-4">
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
        </Form>
      </Modal>
    </div>
  );
}
