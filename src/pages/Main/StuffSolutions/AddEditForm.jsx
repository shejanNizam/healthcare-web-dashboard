import { Button, Card, Divider, Form, Input, Select, message } from "antd";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useGetValueQuery } from "../../../redux/features/value/valueApi";
import Faq from "./Faq";
import WhatWeDo from "./WhatWeDo";

const { TextArea } = Input;
const { Option } = Select;

export default function AddEditForm() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const { data: categoryV } = useGetValueQuery("Category");
  const categoryValue = categoryV?.data;

  console.log(type);

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
    console.log(values);

    try {
      const payload = {
        ...values,
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="">
          {/* Left Column - Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Details Section */}
            <Card className="shadow-sm">
              <h3 className="text-primary flex justify-start items-center gap-4 text-xl font-semibold my-6">
                <button onClick={() => navigate(-1)}>
                  <FaArrowLeft />
                </button>
                {id
                  ? "Edit Nsrsing and Allied health"
                  : "Add Nsrsing and Allied health"}
              </h3>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className="space-y-4"
                // initialValues={}
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

                {/* whatWeDo section import */}
                {type === `workforce_solutions` && (
                  <>
                    <br />
                    <br />
                    <WhatWeDo />
                  </>
                )}
                <br />
                <br />

                {/* faq section import */}
                <Faq />

                <Form.Item
                  label="Tags"
                  name="tags"
                  rules={[{ required: true, message: "Please select tags" }]}
                >
                  <Select
                    size="large"
                    mode="multiple"
                    placeholder="Select Tags"
                    style={{ width: "100%" }}
                  >
                    {categoryValue?.map((cat) => (
                      <Option key={cat._id} value={cat.type}>
                        {cat.type}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Divider />

                {/* Search Engine Listing */}
                <h1 className="text-2xl font-bold pb-2">
                  Search Engine Listing
                </h1>

                <h3 className="text-xl text-primary ">Cenmhealthcare</h3>
                <p className="text-primary text-xs pb-6">
                  https//: cenmhealtcare.com
                </p>
                {/* <link className="" rel="stylesheet" href="https//: cenmhealtcare.com" /> */}
                <p className="text-primary text-xl font-semibold">
                  Staff for hospitals, clinics, and care homes across the UK.
                </p>
                <p className="pb-6">
                  Reliable healthcare staffing agency providing qualified
                  nurses, caregivers, and medical staff for hospitals, clinics,
                  and care homes across the UK.
                </p>

                {/* paeg title */}
                <Form.Item
                  label="Page title"
                  name="pageTitle"
                  rules={[
                    { required: true, message: "Please input page title" },
                  ]}
                >
                  <Input placeholder="Enter page title" size="large" />
                </Form.Item>
                {/* meta descrition */}
                <Form.Item
                  name="metaDescription"
                  label="Meta description"
                  rules={[
                    { required: true, message: "Please input metadescription" },
                  ]}
                >
                  <TextArea
                    rows={5}
                    placeholder="Enter meta description for search engines"
                  />
                </Form.Item>
                {/* url handler */}
                <Form.Item
                  name="urlHandle"
                  label="URL handle"
                  rules={[
                    { required: true, message: "Please input urlHandle" },
                  ]}
                >
                  <Input
                    placeholder="Enter URL handle"
                    size="large"
                    addonBefore="https://cenmhealthcare.com/"
                  />
                </Form.Item>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={loading}
                    className="w-full bg-primary hover:bg-primary/80 h-12 text-base font-medium"
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
    </div>
  );
}
