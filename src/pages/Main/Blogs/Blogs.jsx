// import {
//   Button,
//   Card,
//   Modal,
//   Pagination,
//   Spin,
//   Tooltip,
//   Typography,
//   message,
// } from "antd";
// import { useState } from "react";
// import { FaPlus } from "react-icons/fa";
// import { FiEdit, FiTrash2 } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import {
//   useDeleteBlogMutation,
//   useGetBlogsQuery,
// } from "../../../redux/features/blog/blogApi";

// const { Text, Paragraph } = Typography;

// const baseImageUrl = import.meta.env.VITE_IMAGE_URL;

// export default function Blogs() {
//   const [page, setPage] = useState(1);
//   const navigate = useNavigate();

//   const { data, isLoading, isError, refetch } = useGetBlogsQuery({ page });

//   const blogs = data?.data?.allBlogs || [];
//   console.log(blogs);
//   const totalItems = data?.data?.pagination?.totalData || 0;

//   const [deleteBlog] = useDeleteBlogMutation();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);

//   // Open modal for delete confirmation
//   const openDeleteModal = (id) => {
//     setDeleteId(id);
//     setIsModalOpen(true);
//   };

//   const handleDelete = async () => {
//     if (!deleteId) return;
//     try {
//       await deleteBlog({ id: deleteId }).unwrap();
//       message.success("Blog deleted successfully");
//       setIsModalOpen(false);
//       setDeleteId(null);
//       refetch();
//     } catch (error) {
//       message.error("Failed to delete blog");
//       setIsModalOpen(false);
//       setDeleteId(null);
//     }
//   };

//   const handlePaginationChange = (pageNumber) => {
//     setPage(pageNumber);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Spin size="large" />
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="max-w-6xl mx-auto mt-8 px-4">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-primary text-2xl font-bold">
//             Total : {totalItems}
//           </h3>
//           <Button type="primary" onClick={() => navigate("/add-blog")}>
//             Add <FaPlus />
//           </Button>
//         </div>

//         <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
//           {blogs.map((blog) => (
//             <Card
//               key={blog._id}
//               className="mb-4 bg-blue-50"
//               bodyStyle={{ padding: "12px" }}
//               hoverable
//             >
//               <div className="flex space-x-4">
//                 <img
//                   src={baseImageUrl + blog.banner}
//                   alt={blog.blogTitle || "blog banner"}
//                   className="w-32 h-32 rounded-md object-cover"
//                 />
//                 <div className="flex-1">
//                   <Text strong className="text-primary text-xl font-semibold">
//                     {blog.blogTitle}
//                   </Text>

//                   <p
//                     className="mb-6 text-base"
//                     dangerouslySetInnerHTML={{
//                       __html: blog.description.slice(0, 80) + "...",
//                     }}
//                   />
//                   <Button
//                     type="primary"
//                     size="small"
//                     onClick={() => navigate(`/blogs/${blog.url}`)}
//                   >
//                     Details
//                   </Button>
//                 </div>

//                 <div className="flex flex-col justify-start space-y-2 ml-4">
//                   <Tooltip title="Edit">
//                     <Button
//                       size="small"
//                       shape="circle"
//                       icon={<FiEdit />}
//                       onClick={() => navigate(`/edit-blog/${blog._id}`)}
//                     />
//                   </Tooltip>
//                   <Tooltip title="Delete">
//                     <Button
//                       size="small"
//                       shape="circle"
//                       danger
//                       icon={<FiTrash2 />}
//                       onClick={() => openDeleteModal(blog._id)}
//                     />
//                   </Tooltip>
//                 </div>
//               </div>
//             </Card>
//           ))}
//         </div>
//       </div>

//       <div className="flex justify-center p-4">
//         <Pagination
//           current={page}
//           total={totalItems}
//           pageSize={10}
//           onChange={handlePaginationChange}
//           showQuickJumper
//           showSizeChanger={false}
//         />
//       </div>

//       <Modal
//         title="Confirm Delete"
//         open={isModalOpen}
//         onOk={handleDelete}
//         onCancel={() => setIsModalOpen(false)}
//         okText="Delete"
//         okButtonProps={{ danger: true }}
//         centered
//       >
//         <p>Are you sure you want to delete this blog?</p>
//       </Modal>
//     </>
//   );
// }

import {
  Button,
  Card,
  Modal,
  Pagination,
  Spin,
  Tooltip,
  Typography,
  message,
} from "antd";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  useDeleteBlogMutation,
  useGetBlogsQuery,
} from "../../../redux/features/blog/blogApi";

const { Text } = Typography;

const baseImageUrl = import.meta.env.VITE_IMAGE_URL;

export default function Blogs() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { data, isLoading, isError, refetch } = useGetBlogsQuery({ page });

  const blogs = data?.data?.allBlogs || [];
  const totalItems = data?.data?.pagination?.totalData || 0;

  const [deleteBlog] = useDeleteBlogMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteUrl, setDeleteUrl] = useState(null);

  // Open modal for delete confirmation
  const openDeleteModal = (id, url) => {
    setDeleteId(id);
    setDeleteUrl(url);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteBlog({ id: deleteId }).unwrap();
      message.success("Blog deleted successfully");
      setIsModalOpen(false);
      setDeleteId(null);
      setDeleteUrl(null);
      refetch();
    } catch (error) {
      message.error("Failed to delete blog");
      setIsModalOpen(false);
      setDeleteId(null);
      setDeleteUrl(null);
    }
  };

  const handlePaginationChange = (pageNumber) => {
    setPage(pageNumber);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Error loading blogs. Please try again.</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto mt-8 px-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-primary text-2xl font-bold">
            Total : {totalItems}
          </h3>
          <Button type="primary" onClick={() => navigate("/add-blog")}>
            Add <FaPlus />
          </Button>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">No blogs found.</p>
            <Button
              type="primary"
              className="mt-4"
              onClick={() => navigate("/add-blog")}
            >
              Create Your First Blog
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {blogs.map((blog) => (
                <Card
                  key={blog._id}
                  className="mb-4 bg-blue-50"
                  bodyStyle={{ padding: "12px" }}
                  hoverable
                >
                  <div className="flex space-x-4">
                    <img
                      src={baseImageUrl + blog.banner}
                      alt={blog.blogTitle || "blog banner"}
                      className="w-32 h-32 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <Text
                        strong
                        className="text-primary text-xl font-semibold"
                      >
                        {blog.blogTitle}
                      </Text>

                      <div
                        className="mb-6 text-base"
                        dangerouslySetInnerHTML={{
                          __html: blog.description
                            ? blog.description.slice(0, 80) + "..."
                            : "No description available",
                        }}
                      />
                      <Button
                        type="primary"
                        size="small"
                        onClick={() => navigate(`/blogs/${blog.url}`)}
                      >
                        Details
                      </Button>
                    </div>

                    <div className="flex flex-col justify-start space-y-2 ml-4">
                      <Tooltip title="Edit">
                        <Button
                          size="small"
                          shape="circle"
                          icon={<FiEdit />}
                          onClick={() =>
                            navigate(`/edit-blog/${blog._id}?url=${blog.url}`)
                          }
                        />
                      </Tooltip>
                      <Tooltip title="Delete">
                        <Button
                          size="small"
                          shape="circle"
                          danger
                          icon={<FiTrash2 />}
                          onClick={() => openDeleteModal(blog._id, blog.url)}
                        />
                      </Tooltip>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex justify-center p-4">
              <Pagination
                current={page}
                total={totalItems}
                pageSize={10}
                onChange={handlePaginationChange}
                showQuickJumper
                showSizeChanger={false}
              />
            </div>
          </>
        )}
      </div>

      <Modal
        title="Confirm Delete"
        open={isModalOpen}
        onOk={handleDelete}
        onCancel={() => setIsModalOpen(false)}
        okText="Delete"
        okButtonProps={{ danger: true }}
        centered
      >
        <p>Are you sure you want to delete the blog with URL: {deleteUrl}?</p>
      </Modal>
    </>
  );
}
