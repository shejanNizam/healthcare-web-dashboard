// export default function JobPost() {
//   return (
//     <>
//       <h3>JobPost</h3>
//     </>
//   );
// }

import { UploadOutlined } from "@ant-design/icons";
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
const { TextArea } = Input;

export default function JobPost() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [fileList, setFileList] = useState([]);

  const onFinish = (values) => {
    console.log(values);
    // Prepare data for preview including description and file name
    const formData = {
      ...values,
      deadline: values.deadline?.format("YYYY-MM-DD") || "",
      startDate: values.startDate?.format("YYYY-MM-DD") || "",
      endDate: values.endDate?.format("YYYY-MM-DD") || "",
      description,
      companyLogoName: fileList[0]?.name || "",
    };

    // For demo: navigate to preview with state
    navigate("/job-post/preview", { state: formData });
  };

  const onUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-primary text-2xl font-bold p-2 rounded mb-6">
        Over View
      </h3>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          jobType: "Full time",
        }}
        scrollToFirstError
      >
        <Row gutter={16}>
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
              label="Deadline"
              name="deadline"
              rules={[{ required: true, message: "Please select deadline" }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Job type"
              name="jobType"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="Full time">Full time</Option>
                <Option value="Part time">Part time</Option>
                <Option value="Contract">Contract</Option>
                <Option value="Internship">Internship</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Salary"
              name="salary"
              rules={[{ required: true, message: "Please input salary" }]}
            >
              <Input placeholder="$187" />
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

          <Col span={8}>
            <Form.Item
              label="Start Date"
              name="startDate"
              rules={[{ required: true, message: "Please select start date" }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="End Date"
              name="endDate"
              rules={[{ required: true, message: "Please select end date" }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>

          <Col span={8}>
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

          <Col span={24}>
            <label className="block mb-2 font-medium">Description</label>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              style={{ height: "150px", marginBottom: "70px" }}
            />
            {!description && (
              <div className="text-red-600 mt-[-25px] mb-4">
                Description is required
              </div>
            )}
          </Col>

          <Col span={24}>
            <Form.Item label="Company logo" name="companyLogo">
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

          <Col span={24} className="flex gap-4">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!description}
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
                    companyLogoName: fileList[0]?.name || "",
                  },
                })
              }
              disabled={!description}
            >
              Preview
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
