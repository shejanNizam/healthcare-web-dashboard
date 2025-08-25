import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Select, Spin, Upload } from "antd";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  useGetBlogDetailsQuery,
  usePostBlogMutation,
  useUpdateBlogMutation,
} from "../../../redux/features/blog/blogApi";
import { useUploadFileMutation } from "../../../redux/features/upload/uploadApi";
import { useGetValueQuery } from "../../../redux/features/value/valueApi";

const { TextArea } = Input;
const { Option } = Select;

const baseImageUrl = import.meta.env.VITE_IMAGE_URL || "";

export default function AddBlog() {
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url");

  const { id } = useParams();

  console.log(url);
  console.log(id);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [description, setDescription] = useState("");
  const [fileList, setFileList] = useState([]);
  const [bannerUrl, setBannerUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [uploadFile] = useUploadFileMutation();

  // Use URL-based query instead of ID-based
  const { data, isLoading: isLoadingDetails } = useGetBlogDetailsQuery(url, {
    skip: !url,
  });
  const singleData = data?.data;

  const [postBlog, { isLoading: isPosting }] = usePostBlogMutation();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();

  const { data: categoryV } = useGetValueQuery("Category");
  const categoryValue = categoryV?.data || [];

  useEffect(() => {
    if (url && singleData) {
      // Set all form fields with the existing data
      form.setFieldsValue({
        blogTitle: singleData.blogTitle,
        url: singleData.url,
        category: singleData.category,
        pageTitle: singleData.pageTitle,
        meteDescription: singleData.meteDescription,
      });

      setDescription(singleData.description || "");

      // Set fileList from existing banner if present
      if (singleData.banner) {
        const filename = singleData.banner.split("/").pop();
        setFileList([
          {
            uid: "-1",
            name: filename,
            status: "done",
            url: `${baseImageUrl}${singleData.banner}`,
          },
        ]);
        setBannerUrl(singleData.banner);
      }
    }
  }, [url, singleData, form]);

  const onFinish = async (values) => {
    if (!description) {
      message.error("Description is required");
      return;
    }

    if (!bannerUrl) {
      message.error("Banner image is required");
      return;
    }

    const payload = {
      blogTitle: values.blogTitle,
      description: description,
      banner: bannerUrl,
      url: values.url,
      category: values.category,
      pageTitle: values.pageTitle,
      meteDescription: values.meteDescription,
    };

    try {
      setLoading(true);
      if (id) {
        // Update using URL instead of ID
        await updateBlog({ id, blogData: payload }).unwrap();
        message.success("Blog updated successfully!");
      } else {
        await postBlog(payload).unwrap();
        message.success("Blog created successfully!");
      }
      navigate("/blogs");
    } catch (error) {
      console.error("Error saving blog:", error);
      message.error(error?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Updated upload handler from previous code
  const onUploadChange = async ({ file, fileList: newFileList }) => {
    setFileList(newFileList);

    if (file.status === "removed") {
      setBannerUrl("");
      return;
    }

    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file.originFileObj || file);

      const response = await uploadFile(formData).unwrap();

      if (response.success && response.data?.path) {
        setBannerUrl(response.data.path);
        message.success("Image uploaded successfully");
      } else {
        console.error("Upload failed: ", response.message || "No URL returned");
        message.error("Image upload failed");
        setBannerUrl("");
      }
    } catch (error) {
      console.error("Upload error: ", error);
      message.error("Image upload failed");
      setBannerUrl("");
    }
  };

  // Updated upload props from previous code
  const uploadProps = {
    beforeUpload: () => false,
    onChange: onUploadChange,
    fileList: fileList,
    maxCount: 1,
    accept: "image/*",
    listType: "picture",
    onRemove: () => {
      setBannerUrl("");
      return true;
    },
  };

  if (isLoadingDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4 border shadow-sm rounded-lg bg-white">
      <h3 className="text-primary flex justify-start items-center gap-4 text-xl font-semibold my-6">
        <button onClick={() => navigate(-1)} className="text-primary">
          <FaArrowLeft />
        </button>
        {url ? "Edit Blog" : "Add Blog"}
      </h3>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        // initialValues={{
        //   category: "all",
        // }}
      >
        {/* Updated Banner Upload from previous code */}
        <Form.Item label="Banner" name="banner">
          <Upload
            beforeUpload={() => false}
            onChange={onUploadChange}
            fileList={fileList}
            maxCount={1}
            accept="image/*"
            listType="picture"
            onRemove={() => setBannerUrl("")}
          >
            <Button icon={<UploadOutlined />}>Upload Banner</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Blog Title"
          name="blogTitle"
          rules={[{ required: true, message: "Please input blog title" }]}
        >
          <Input placeholder="Enter blog title" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select placeholder="Select Category">
            {categoryValue.map((cat) => (
              <Option key={cat._id} value={cat.type}>
                {cat.type}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Description"
          required
          validateStatus={!description ? "error" : ""}
          help={!description ? "Description is required" : ""}
        >
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            style={{ height: 200, marginBottom: 40 }}
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
              ],
            }}
          />
        </Form.Item>

        {/* search engine listing */}
        <h1 className="text-2xl font-bold pb-6">Search Engine Listing</h1>

        <h3 className="text-xl text-primary ">Cenmhealthcare</h3>
        <p className="text-primary text-xs pb-6">https//: cenmhealtcare.com</p>
        <p className="text-primary text-xl font-semibold pb-2">
          Staff for hospitals, clinics, and care homes across the UK.
        </p>
        <p className="pb-6">
          Reliable healthcare staffing agency providing qualified nurses,
          caregivers, and medical staff for hospitals, clinics, and care homes
          across the UK.
        </p>

        {/* page title */}
        <Form.Item
          label="Page Title"
          name="pageTitle"
          rules={[{ required: true, message: "Please input page title" }]}
          tooltip="This appears in browser tabs and search results"
        >
          <Input placeholder="Enter page title for SEO" />
        </Form.Item>

        {/* meta description */}
        <Form.Item
          label="Meta Description"
          name="meteDescription"
          rules={[{ required: true, message: "Please input meta description" }]}
          tooltip="This appears in search results under your page title"
        >
          <TextArea
            rows={4}
            placeholder="Enter meta description for search engines (150-160 characters recommended)"
            maxLength={160}
            showCount
          />
        </Form.Item>

        {/* url handler */}
        <Form.Item
          label="URL Handle"
          name="url"
          rules={[{ required: true, message: "Please input URL handle" }]}
          tooltip="This will be used in the blog URL (e.g., your-blog-title)"
        >
          <Input placeholder="e.g., test_test" />
        </Form.Item>

        <Form.Item className="mt-6">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading || isPosting || isUpdating}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {url ? "Update Blog" : "Publish Blog"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
