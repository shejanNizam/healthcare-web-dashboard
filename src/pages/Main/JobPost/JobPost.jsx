import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Typography,
  Upload,
} from "antd";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { usePostJobMutation } from "../../../redux/features/jobs/jobsApi";
import { useUploadFileMutation } from "../../../redux/features/upload/uploadApi";
import { useGetValueQuery } from "../../../redux/features/value/valueApi";

const { Title } = Typography;
const { Option } = Select;

export default function JobPost() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  const [fileList, setFileList] = useState([]);
  const [companyLogoUrl, setCompanyLogoUrl] = useState("");

  const [uploadFile] = useUploadFileMutation();
  const { data: categoryV } = useGetValueQuery("Category");
  const { data: professionV } = useGetValueQuery("Profession");

  const categoryValue = categoryV?.data;
  const professionValue = professionV?.data;

  const [postJob, { isLoading, isError }] = usePostJobMutation();

  const onFinish = async (values) => {
    const payload = {
      hospitalName: values.hospitalName,
      title: values.title,
      address: values.address,
      deadline: values.deadline ? values.deadline.toISOString() : null,
      jobType: values.jobType,
      category: values.category,
      profession: values.profession,
      salary: Number(values.salary),
      vacancy: Number(values.vacancy),
      startDate: values.startDate ? values.startDate.toISOString() : null,
      hoursPerWeek: Number(values.hoursPerWeek),
      description,
      responsibilities: values.responsibilities || [],
      summary,
      requirements: values.requirements || [],
      benefits: values.benefits || [],
      companyLogo: companyLogoUrl,
    };

    console.log("Payload to post:", payload);

    try {
      const response = await postJob(payload).unwrap();
      console.log("Job posted successfully:", response);
      navigate("/job-post/preview", { state: payload });
    } catch (error) {
      console.error("Failed to post job:", error);
    }
  };

  const onUploadChange = async ({ file, fileList }) => {
    setFileList(fileList);

    if (file.status === "removed") {
      setCompanyLogoUrl("");
      return;
    }
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await uploadFile(formData).unwrap();

      if (response.success && response.data?.url) {
        setCompanyLogoUrl(response.data.url);
      } else {
        console.error("Upload failed: ", response.message || "No URL returned");
        setCompanyLogoUrl("");
      }
    } catch (error) {
      console.error("Upload error: ", error);
      setCompanyLogoUrl("");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* <h3 className="text-primary text-2xl font-bold mb-6">Overview</h3> */}
      <h3 className="text-primary flex justify-start items-center gap-4 text-xl font-semibold mb-6">
        <button onClick={() => navigate(-1)}>
          {" "}
          <FaArrowLeft />{" "}
        </button>
        {id ? "Edit Job Post" : "Add Job Post"}
      </h3>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          responsibilities: [""],
          requirements: [""],
          benefits: [""],
        }}
        scrollToFirstError
      >
        <Row gutter={16}>
          {/* Basic Fields */}
          <Col span={24}>
            <Form.Item
              label="Hospital Name"
              name="hospitalName"
              rules={[
                { required: true, message: "Please input hospital name" },
              ]}
            >
              <Input placeholder="Hospital Name" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please input job title" }]}
            >
              <Input placeholder="Senior Nurse" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please input address" }]}
            >
              <Input placeholder="New York, USA" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select placeholder="Select Category" style={{ width: "100%" }}>
                {categoryValue?.map((cat) => (
                  <Option key={cat._id} value={cat.type}>
                    {cat.type}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Profession"
              name="profession"
              rules={[{ required: true, message: "Please select profession" }]}
            >
              <Select placeholder="Select Profession" style={{ width: "100%" }}>
                {professionValue?.map((cat) => (
                  <Option key={cat._id} value={cat.type}>
                    {cat.type}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Job Type"
              name="jobType"
              rules={[{ required: true, message: "Please select job type" }]}
            >
              <Select placeholder="Select Job Type" style={{ width: "100%" }}>
                <Option value="full-time">Full time</Option>
                <Option value="part-time">Part time</Option>
                <Option value="contract">Contract</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Hours per week"
              name="hoursPerWeek"
              rules={[
                { required: true, message: "Please input hours per week" },
              ]}
            >
              <Input type="number" placeholder="38" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Salary"
              name="salary"
              rules={[{ required: true, message: "Please input salary " }]}
            >
              <Input type="number" placeholder="salary" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Vacancy"
              name="vacancy"
              rules={[{ required: true, message: "Please input vacancy" }]}
            >
              <Input type="number" placeholder="21" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Start Date"
              name="startDate"
              rules={[{ required: true, message: "Please select start date" }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Deadline"
              name="deadline"
              rules={[{ required: true, message: "Please select deadline" }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>

          {/* Description */}
          <Col span={24} className="mb-8">
            <label className="block mb-2 font-medium">Description</label>
            <ReactQuill
              theme="snow"
              name="description"
              value={description}
              onChange={setDescription}
              style={{ height: 150 }}
            />
            {!description && (
              <div className="text-red-600 mt-2">Description is required</div>
            )}
          </Col>

          {/* Responsibilities */}
          <Form.List name="responsibilities">
            {(fields, { add, remove }) => (
              <Col span={24} className="mb-8">
                <h3 className="text-xl text-primary font-bold mb-4">
                  Responsibilities
                </h3>
                {fields.map(({ key, name, ...restField }) => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 12,
                      width: "100%",
                    }}
                  >
                    <Form.Item
                      {...restField}
                      name={[name]}
                      rules={[
                        {
                          required: true,
                          message: "Please enter responsibility",
                        },
                      ]}
                      style={{ flex: 1, marginBottom: 0 }}
                    >
                      <Input placeholder="Responsibility name..." />
                    </Form.Item>
                    <MinusCircleOutlined
                      onClick={() => remove(name)}
                      style={{
                        color: "#ef4444",
                        fontSize: 20,
                        cursor: "pointer",
                        marginLeft: 12,
                      }}
                    />
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Responsibilities
                  </Button>
                </Form.Item>
              </Col>
            )}
          </Form.List>

          {/* Requirements */}
          <Form.List name="requirements">
            {(fields, { add, remove }) => (
              <Col span={24} className="mb-8">
                <h3 className="text-xl text-primary font-bold mb-4">
                  Requirements
                </h3>
                {fields.map(({ key, name, ...restField }) => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 12,
                      width: "100%",
                    }}
                  >
                    <Form.Item
                      {...restField}
                      name={[name]}
                      rules={[
                        { required: true, message: "Please enter requirement" },
                      ]}
                      style={{ flex: 1, marginBottom: 0 }}
                    >
                      <Input placeholder="Requirement name..." />
                    </Form.Item>
                    <MinusCircleOutlined
                      onClick={() => remove(name)}
                      style={{
                        color: "#ef4444",
                        fontSize: 20,
                        cursor: "pointer",
                        marginLeft: 12,
                      }}
                    />
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Requirements
                  </Button>
                </Form.Item>
              </Col>
            )}
          </Form.List>

          {/* Benefits */}
          <Form.List name="benefits">
            {(fields, { add, remove }) => (
              <Col span={24} className="mb-8">
                <h3 className="text-xl text-primary font-bold mb-4">
                  Benefits
                </h3>
                {fields.map(({ key, name, ...restField }) => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 12,
                      width: "100%",
                    }}
                  >
                    <Form.Item
                      {...restField}
                      name={[name]}
                      rules={[
                        { required: true, message: "Please enter benefit" },
                      ]}
                      style={{ flex: 1, marginBottom: 0 }}
                    >
                      <Input placeholder="Benefit name..." />
                    </Form.Item>
                    <MinusCircleOutlined
                      onClick={() => remove(name)}
                      style={{
                        color: "#ef4444",
                        fontSize: 20,
                        cursor: "pointer",
                        marginLeft: 12,
                      }}
                    />
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Benefits
                  </Button>
                </Form.Item>
              </Col>
            )}
          </Form.List>

          {/* Summary */}
          <Col span={24} className="mb-8">
            <label className="block mb-2 font-medium">Summary</label>
            <ReactQuill
              theme="snow"
              name="summary"
              value={summary}
              onChange={setSummary}
              style={{ height: 150 }}
            />
            {!summary && (
              <div className="text-red-600 mt-2">Summary is required</div>
            )}
          </Col>

          {/* Company Logo Upload */}
          <Col span={24} className="mb-8">
            <Form.Item label="Company Logo" name="companyLogo">
              <Upload
                beforeUpload={() => false}
                onChange={onUploadChange}
                fileList={fileList}
                maxCount={1}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>Upload Company Logo</Button>
              </Upload>
            </Form.Item>
          </Col>

          {/* Buttons */}
          <Col
            span={24}
            className="flex gap-4 justify-end"
            style={{ marginTop: 12 }}
          >
            <Button
              type="primary"
              htmlType="submit"
              disabled={!description || !summary}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Submit
            </Button>
            <Button
              type="default"
              onClick={() =>
                navigate("/job-post/preview", {
                  state: {
                    ...form.getFieldsValue(),
                    description,
                    summary,
                    companyLogoName: fileList[0]?.name || "",
                  },
                })
              }
              disabled={!description || !summary}
            >
              Preview
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
