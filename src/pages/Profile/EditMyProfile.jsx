// import { UploadOutlined } from "@ant-design/icons";
// import { Button, Form, Input, message, Spin, Upload } from "antd";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import defaultImage from "../../assets/images/dash-profile.png";
// import PageHeading from "../../Components/PageHeading";
// import {
//   useGetUserByTokenQuery,
//   useUpdateUserMutation,
// } from "../../redux/features/auth/authApi";
// import { useUploadFileMutation } from "../../redux/features/upload/uploadApi";

// const baseImageUrl = import.meta.env.VITE_IMAGE_URL;

// const EditMyProfile = () => {
//   const navigate = useNavigate();
//   const [updateProfile, { isLoading: isUpdateLoading }] =
//     useUpdateUserMutation();
//   const [uploadFile] = useUploadFileMutation();
//   const [fileList, setFileList] = useState([]);
//   const [imageUrl, setImageUrl] = useState("");

//   const { data, isLoading, refetch } = useGetUserByTokenQuery();
//   const profileData = data?.data || {};

//   useEffect(() => {
//     if (profileData.image) {
//       const filename = profileData.image.split("/").pop();
//       setFileList([
//         {
//           uid: "-1",
//           name: filename,
//           status: "done",
//           url: `${baseImageUrl}${profileData.image}`,
//         },
//       ]);
//       setImageUrl(profileData.image);
//     }
//   }, [profileData.image]);

//   const onFinish = async (values) => {
//     try {
//       const payload = {
//         name: values.name,
//         image: imageUrl,
//       };

//       const response = await updateProfile(payload).unwrap();

//       message.success(
//         response?.data?.message ||
//           response?.message ||
//           "Profile updated successfully"
//       );

//       refetch();
//       navigate("/settings/profile");
//     } catch (error) {
//       message.error(error?.data?.message || "Failed to update profile");
//     }
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   const onUploadChange = async ({ file, fileList: newFileList }) => {
//     setFileList(newFileList);

//     if (file.status === "removed") {
//       setImageUrl("");
//       return;
//     }

//     if (!file) return;

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const response = await uploadFile(formData).unwrap();

//       if (response.success && response.data?.path) {
//         setImageUrl(response.data.path);
//       } else {
//         message.error(response.message || "Upload failed");
//         setImageUrl("");
//       }
//     } catch (error) {
//       console.error("Upload error:", error);
//       message.error("Failed to upload image");
//       setImageUrl("");
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <Spin size="large" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-[24px] min-h-[83vh] bg-white rounded-2xl">
//       <PageHeading
//         title={"Edit Personal Information"}
//         backPath={-1}
//         className={"px-10 border-b border-primary text-button py-6"}
//       />

//       <div className="w-full">
//         <Form
//           name="basic"
//           layout="vertical"
//           className="w-full grid grid-cols-12 gap-x-10 px-14 py-8"
//           onFinish={onFinish}
//           onFinishFailed={onFinishFailed}
//           autoComplete="off"
//           initialValues={{
//             name: profileData.name,
//             email: profileData.email,
//           }}
//         >
//           <div className="col-span-3 space-y-6">
//             <div className="min-h-[365px] flex flex-col items-center justify-center p-8 rounded-lg border border-primary shadow-inner space-y-4">
//               <div className="my-3">
//                 <Upload
//                   beforeUpload={() => false}
//                   onChange={onUploadChange}
//                   fileList={fileList}
//                   maxCount={1}
//                   accept="image/*"
//                   listType="picture-circle"
//                   onRemove={() => setImageUrl("")}
//                   showUploadList={{
//                     showPreviewIcon: true,
//                     showRemoveIcon: true,
//                   }}
//                 >
//                   {fileList.length >= 1 ? null : (
//                     <div className="flex flex-col items-center relative">
//                       <img
//                         src={
//                           profileData.image
//                             ? `${baseImageUrl}${profileData.image}`
//                             : defaultImage
//                         }
//                         alt="Profile"
//                         className="h-[144px] w-[144px] rounded-full object-cover"
//                       />
//                       <Button
//                         type="text"
//                         icon={<UploadOutlined />}
//                         className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white text-primary border border-primary rounded-full"
//                       ></Button>
//                     </div>
//                   )}
//                 </Upload>
//               </div>
//               <h5 className="text-lg">{profileData.name}</h5>
//               <h4 className="text-2xl">{"Admin"}</h4>
//             </div>
//           </div>

//           <div className="col-span-5 space-y-[24px]">
//             <Form.Item
//               className="text-lg font-medium"
//               label="Name"
//               name="name"
//               rules={[{ required: true, message: "Name is required" }]}
//             >
//               <Input size="large" className="h-[56px] rounded-lg mt-3" />
//             </Form.Item>

//             <Form.Item
//               className="text-lg font-medium"
//               label="Email"
//               name="email"
//             >
//               <Input
//                 readOnly
//                 size="large"
//                 className="h-[56px] rounded-lg mt-3"
//               />
//             </Form.Item>

//             <Form.Item className="flex justify-end pt-4">
//               <Button
//                 size="large"
//                 type="primary"
//                 className="px-8 w-[250px]"
//                 htmlType="submit"
//                 loading={isUpdateLoading}
//               >
//                 Save Changes
//               </Button>
//             </Form.Item>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default EditMyProfile;

import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Spin, Upload } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../assets/images/dash-profile.png";
import PageHeading from "../../Components/PageHeading";
import {
  useGetUserByTokenQuery,
  useUpdateUserMutation,
} from "../../redux/features/auth/authApi";
import { useUploadFileMutation } from "../../redux/features/upload/uploadApi";

const baseImageUrl = import.meta.env.VITE_IMAGE_URL;

const EditMyProfile = () => {
  const navigate = useNavigate();
  const [updateProfile, { isLoading: isUpdateLoading }] =
    useUpdateUserMutation();
  const [uploadFile] = useUploadFileMutation();
  const [imageUrl, setImageUrl] = useState("");

  const { data, isLoading, refetch } = useGetUserByTokenQuery();
  const profileData = data?.data || {};

  useEffect(() => {
    if (profileData.image) {
      setImageUrl(profileData.image);
    }
  }, [profileData.image]);

  const onFinish = async (values) => {
    try {
      const payload = {
        name: values.name,
        image: imageUrl,
      };

      const response = await updateProfile(payload).unwrap();

      message.success(
        response?.data?.message ||
          response?.message ||
          "Profile updated successfully"
      );

      refetch();
      navigate("/settings/profile");
    } catch (error) {
      message.error(error?.data?.message || "Failed to update profile");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await uploadFile(formData).unwrap();

      if (response.success && response.data?.path) {
        setImageUrl(response.data.path);
        message.success("Image uploaded successfully");
      } else {
        message.error(response.message || "Upload failed");
      }
      return false; // Prevent default upload behavior
    } catch (error) {
      console.error("Upload error:", error);
      message.error("Failed to upload image");
      return false;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-[24px] min-h-[83vh] bg-white rounded-2xl">
      <PageHeading
        title={"Edit Personal Information"}
        backPath={-1}
        className={"px-10 border-b border-primary text-button py-6"}
      />

      <div className="w-full">
        <Form
          name="basic"
          layout="vertical"
          className="w-full grid grid-cols-12 gap-x-10 px-14 py-8"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{
            name: profileData.name,
            email: profileData.email,
          }}
        >
          <div className="col-span-3 space-y-6">
            <div className="min-h-[365px] flex flex-col items-center justify-center p-8 rounded-lg border border-primary shadow-inner space-y-4">
              <div className="my-3 relative">
                <img
                  src={imageUrl ? `${baseImageUrl}${imageUrl}` : defaultImage}
                  alt="Profile"
                  className="h-40 w-40 rounded-full object-cover"
                />
                <Upload
                  beforeUpload={handleUpload}
                  accept="image/*"
                  showUploadList={false}
                >
                  <div className="absolute inset-0 flex items-center justify-center rounded-full opacity-100 transition-opacity duration-300 cursor-pointer">
                    <UploadOutlined className="text-white text-4xl font-bold" />
                  </div>
                </Upload>
              </div>
              <h5 className="text-lg">{profileData.name}</h5>
              <h4 className="text-2xl">{"Admin"}</h4>
            </div>
          </div>

          <div className="col-span-5 space-y-[24px]">
            <Form.Item
              className="text-lg font-medium"
              label="Name"
              name="name"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input size="large" className="h-[56px] rounded-lg mt-3" />
            </Form.Item>

            <Form.Item
              className="text-lg font-medium"
              label="Email"
              name="email"
            >
              <Input
                readOnly
                size="large"
                className="h-[56px] rounded-lg mt-3"
              />
            </Form.Item>

            <Form.Item className="flex justify-end pt-4">
              <Button
                size="large"
                type="primary"
                className="px-8 w-[250px]"
                htmlType="submit"
                loading={isUpdateLoading}
              >
                Save Changes
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditMyProfile;
