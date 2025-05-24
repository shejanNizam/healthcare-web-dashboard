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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

export default function JobPost() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  const [fileList, setFileList] = useState([]);

  const onFinish = (values) => {
    console.log(values);
    const formData = {
      ...values,
      deadline: values.deadline?.format("YYYY-MM-DD") || "",
      startDate: values.startDate?.format("YYYY-MM-DD") || "",
      endDate: values.endDate?.format("YYYY-MM-DD") || "",
      description,
      summary,
      companyLogoName: fileList[0]?.name || "",
    };

    navigate("/job-post/preview", { state: formData });
  };

  const onUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-primary text-2xl font-bold mb-6">Overview</h3>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          responsibilities: [{ responsibilitiesName: "" }],
          requirements: [{ requirementsName: "" }],
          benefits: [{ benefitsName: "" }],
        }}
        scrollToFirstError
      >
        <Row gutter={16}>
          {/* Basic Fields */}
          <Col span={24}>
            <Form.Item
              label="Hospital Name"
              name="hospital-name"
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
              label="Job Type"
              name="job-type"
              rules={[{ required: true, message: "Please select job type" }]}
            >
              <Select placeholder="Select Job Type" style={{ width: "100%" }}>
                <Option value="Full time">Full time</Option>
                <Option value="Part time">Part time</Option>
                <Option value="Contract">Contract</Option>
                <Option value="Internship">Internship</Option>
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
              label="Salary Range"
              name="salary-range"
              rules={[
                { required: true, message: "Please select salary range" },
              ]}
            >
              <Select
                placeholder="Select Salary Range"
                style={{ width: "100%" }}
              >
                <Option value="$0 - $5000">$0 - $5000</Option>
                <Option value="$5001 - $10,000">$5001 - $10,000</Option>
                <Option value="$10,001 - $15,000">$10,001 - $15,000</Option>
                <Option value="$15,001 - $20,000">$15,001 - $20,000</Option>
                <Option value="$20,001 - $25,000">$20,001 - $25,000</Option>
                <Option value="$25,001 - $30,000">$25,001 - $30,000</Option>
              </Select>
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
                      name={[name, "responsibilitiesName"]}
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
                      name={[name, "requirementsName"]}
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
                      name={[name, "benefitsName"]}
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
