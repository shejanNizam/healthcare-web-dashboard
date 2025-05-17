// export default function AddBlog() {
//   return (
//     <>
//       <h3>AddBlog</h3>
//     </>
//   );
// }

import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Typography, Upload } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const { TextArea } = Input;
const { Text } = Typography;

const dummyBlogs = [
  {
    id: 1,
    title: "Registered nurse- progressive care",
    category: "Nurse",
    banner: "banner.jpg",
    description:
      "We are looking for a qualified and compassionate Registered Nurse to join our team. As a nurse in our organization, you will be responsible for providing high-quality patient care.",
  },
  {
    id: 2,
    title: "Registered nurse- progressive care",
    category: "Nurse",
    banner: "shejan.jpg",
    description:
      "We are looking for a qualified and compassionate Registered Nurse to join our team. As a nurse in our organization, you will be responsible for providing high-quality patient care.",
  },
  {
    id: 3,
    title: "Registered nurse- progressive care",
    category: "Nurse",
    banner: "nizam.jpg",
    description:
      "We are looking for a qualified and compassionate Registered Nurse to join our team. As a nurse in our organization, you will be responsible for providing high-quality patient care.",
  },
];

export default function AddBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [fileName, setFileName] = useState("");

  // Load default data if editing
  useEffect(() => {
    if (id) {
      const blog = dummyBlogs.find((b) => b.id === Number(id));
      if (blog) {
        form.setFieldsValue({
          description: blog.description,
          banner: null,
        });
        setFileName(blog.banner);
      }
    }
  }, [id, form]);

  // Upload props (just simulate upload, no real upload)
  const uploadProps = {
    beforeUpload: (file) => {
      setFileName(file.name);
      message.success(`${file.name} selected`);
      return false; // prevent upload
    },
    maxCount: 1,
    showUploadList: false,
  };

  const onFinish = (values) => {
    console.log("Form values:", values);
    message.success(id ? "Blog updated!" : "Blog added!");
    navigate("/blogs");
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <h3 className="text-blue-600 text-xl font-semibold mb-6">
        {id ? "Edit Blog" : "Add Blog"}
      </h3>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Banner" name="banner">
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Upload Banner</Button>
          </Upload>
          {fileName && (
            <Text className="ml-4" type="secondary">
              {fileName}
            </Text>
          )}
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter the description" }]}
        >
          <TextArea rows={6} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
