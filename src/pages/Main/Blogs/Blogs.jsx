// export default function Blogs() {
//   return (
//     <>
//       <h3>Blogs</h3>
//     </>
//   );
// }

import { Button, Card, Modal, Tooltip, Typography } from "antd";
import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const { Text, Paragraph } = Typography;

const dummyBlogs = [
  {
    id: 1,
    title: "Registered nurse- progressive care",
    category: "Nurse",
    banner:
      "https://images.unsplash.com/photo-1588776814546-c5533cfc5eac?auto=format&fit=crop&w=80&q=80",
    description:
      "We are looking for a qualified and compassionate Registered Nurse to join our team. As a nurse in our organization, you will be responsible for providing high-quality patient care.",
  },
  {
    id: 2,
    title: "Registered nurse- progressive care",
    category: "Nurse",
    banner:
      "https://images.unsplash.com/photo-1588776814546-c5533cfc5eac?auto=format&fit=crop&w=80&q=80",
    description:
      "We are looking for a qualified and compassionate Registered Nurse to join our team. As a nurse in our organization, you will be responsible for providing high-quality patient care.",
  },
  {
    id: 3,
    title: "Registered nurse- progressive care",
    category: "Nurse",
    banner:
      "https://images.unsplash.com/photo-1588776814546-c5533cfc5eac?auto=format&fit=crop&w=80&q=80",
    description:
      "We are looking for a qualified and compassionate Registered Nurse to join our team. As a nurse in our organization, you will be responsible for providing high-quality patient care.",
  },
];

export default function Blogs() {
  const [blogs, setBlogs] = useState(dummyBlogs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    setBlogs((prev) => prev.filter((blog) => blog.id !== deleteId));
    setIsModalOpen(false);
    setDeleteId(null);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-blue-600 text-xl font-semibold">
          Total : {blogs.length}
        </h3>
        <Button type="primary" onClick={() => navigate("/add-blog")}>
          Add
        </Button>
      </div>

      {blogs.map((blog) => (
        <Card
          key={blog.id}
          className="mb-4 bg-blue-50"
          bodyStyle={{ padding: "12px" }}
          bordered={false}
          hoverable
        >
          <div className="flex space-x-4">
            <img
              src={blog.banner}
              alt="banner"
              className="w-20 h-20 rounded-md object-cover"
            />
            <div className="flex-1">
              <Text strong className="text-blue-800">
                {blog.title}
              </Text>
              <Text type="secondary" className="block text-xs">
                Category: {blog.category}
              </Text>
              <Paragraph
                className="text-xs"
                ellipsis={{ rows: 2, expandable: false, symbol: "see more" }}
              >
                {blog.description}
              </Paragraph>
              <Button
                type="primary"
                size="small"
                onClick={() => navigate(`/blogs/${blog.id}`)}
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
                  onClick={() => navigate(`/edit-blog/${blog.id}`)}
                />
              </Tooltip>
              <Tooltip title="Delete">
                <Button
                  size="small"
                  shape="circle"
                  danger
                  icon={<FiTrash2 />}
                  onClick={() => openDeleteModal(blog.id)}
                />
              </Tooltip>
            </div>
          </div>
        </Card>
      ))}

      <Modal
        title="Confirm Delete"
        open={isModalOpen}
        onOk={handleDelete}
        onCancel={() => setIsModalOpen(false)}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this blog?</p>
      </Modal>
    </div>
  );
}
