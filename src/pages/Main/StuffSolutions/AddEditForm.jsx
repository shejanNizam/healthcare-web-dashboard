import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  message,
  Select,
  Spin,
} from "antd";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  useAddStuffMutation,
  useGetSingleStuffQuery,
  useUpdateStuffMutation,
} from "../../../redux/features/stuff/stuffApi";
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
  // console.log(id);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [initialValuesSet, setInitialValuesSet] = useState(false);

  const { data: categoryV } = useGetValueQuery("Category");
  const categoryValue = categoryV?.data;

  // Fetch existing data when in edit mode
  const {
    data: existingData,
    isLoading: isDataLoading,
    error,
  } = useGetSingleStuffQuery(
    { id },
    {
      skip: !id,
    }
  );

  const [addStuff] = useAddStuffMutation();
  const [updateStuff] = useUpdateStuffMutation();

  // Set initial values when existing data is available
  useEffect(() => {
    if (id && existingData && !initialValuesSet) {
      const singleStuff = existingData.data;

      // Transform the API data to match form field names
      const formValues = {
        serviceAlias: singleStuff.serviceAlias,
        // type: singleStuff.type,
        type: type,
        bannerHeading: singleStuff.bannerHeading,
        tagline: singleStuff.tagline,
        title: singleStuff.title,
        description: singleStuff.description,
        whyChooseUs: singleStuff.why_choose,
        tags: singleStuff.tags,
        pageTitle: singleStuff.pageTitle,
        metaDescription: singleStuff.mateDescription,
        urlHandle: type,
        whatWeDo: singleStuff.whatWeDo || [],
        faq: singleStuff.faq || [],
      };

      form.setFieldsValue(formValues);
      setInitialValuesSet(true);
    }
  }, [id, existingData, form, initialValuesSet]);

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const jobData = {
        serviceAlias: values.serviceAlias,
        // type: values.type,
        type: type,
        bannerHeading: values.bannerHeading,
        tagline: values.tagline,
        title: values.title,
        description: values.description,
        why_choose: values.whyChooseUs,
        tags: values.tags,
        pageTitle: values.pageTitle,
        mateDescription: values.metaDescription,
        url: type,
        whatWeDo: values.whatWeDo || [],
        faq: values.faq || [],
      };

      if (id) {
        // Update existing stuff
        const result = await updateStuff({ id, jobData }).unwrap();
        message.success("Staff updated successfully!");
        console.log("Update response:", result);
      } else {
        // Add new stuff
        const result = await addStuff({ jobData }).unwrap();
        message.success("Staff added successfully!");
        console.log("Add response:", result);
      }

      // Navigate back or to another page on success
      navigate(-1);
    } catch (error) {
      console.error("Submission error:", error);
      message.error(
        error.data?.message || "Failed to submit form. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner while fetching existing data
  if (id && isDataLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  // Show error message if data fetching fails
  if (id && error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-red-600 text-xl mb-4">Error loading data</h2>
          <Button type="primary" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

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
                  ? `Edit ${
                      type === "workforce_solutions"
                        ? "Workforce Solutions"
                        : "Staffing Solutions"
                    }`
                  : `Add ${
                      type === "workforce_solutions"
                        ? "Workforce Solutions"
                        : "Staffing Solutions"
                    }`}
              </h3>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className="space-y-4"
              >
                {/* Hidden type field */}
                <Form.Item name="type" hidden>
                  <Input type="hidden" />
                </Form.Item>

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
                    name="tagline"
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
                <Form.Item
                  label="Why choose us"
                  name="whyChooseUs"
                  rules={[
                    {
                      required: true,
                      message:
                        "Please explain why customers should choose your service",
                    },
                  ]}
                >
                  <TextArea
                    rows={4}
                    placeholder="Explain why customers should choose your service"
                  />
                </Form.Item>

                <Divider />

                {/* whatWeDo section - conditionally rendered based on type */}
                {type === "workforce_solutions" && (
                  <>
                    <WhatWeDo form={form} />
                    <br />
                  </>
                )}

                {/* faq section */}
                <Faq form={form} />
                <br />

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
                  https://cenmhealthcare.com
                </p>
                <p className="text-primary text-xl font-semibold">
                  Staff for hospitals, clinics, and care homes across the UK.
                </p>
                <p className="pb-6">
                  Reliable healthcare staffing agency providing qualified
                  nurses, caregivers, and medical staff for hospitals, clinics,
                  and care homes across the UK.
                </p>

                {/* Page title */}
                <Form.Item
                  label="Page title"
                  name="pageTitle"
                  rules={[
                    { required: true, message: "Please input page title" },
                  ]}
                >
                  <Input placeholder="Enter page title" size="large" />
                </Form.Item>

                {/* Meta description */}
                <Form.Item
                  name="metaDescription"
                  label="Meta description"
                  rules={[
                    {
                      required: true,
                      message: "Please input meta description",
                    },
                  ]}
                >
                  <TextArea
                    rows={5}
                    placeholder="Enter meta description for search engines"
                  />
                </Form.Item>

                {/* URL handle */}
                <Form.Item
                  name="urlHandle"
                  label="URL handle"
                  rules={[
                    { required: true, message: "Please input URL handle" },
                  ]}
                >
                  <Input
                    placeholder="Enter URL handle"
                    size="large"
                    addonBefore="https://cenmhealthcare.com/"
                    defaultValue={type}
                    readOnly={true}
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
                    {loading ? "Submitting..." : id ? "Update" : "Submit"}
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
