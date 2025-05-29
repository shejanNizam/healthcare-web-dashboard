import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Table, Upload, message } from "antd";
import { useEffect, useState } from "react";
import { FaEdit, FaFolder, FaTrash } from "react-icons/fa";

const dummyDataByType = {
  category: [
    { id: 1, name: "Nurse", iconPreview: null, iconFile: null },
    { id: 2, name: "Doctor", iconPreview: null, iconFile: null },
  ],
  profession: [
    { id: 1, name: "Registered Nurse" },
    { id: 2, name: "Surgeon" },
  ],
  discipline: [
    { id: 1, name: "Cardiology" },
    { id: 2, name: "Neurology" },
  ],
  specialty: [
    { id: 1, name: "Pediatrics" },
    { id: 2, name: "Oncology" },
  ],
  license: [
    { id: 1, name: "State License A" },
    { id: 2, name: "State License B" },
  ],
};

const AddValue = ({ type }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Icon upload states for category
  const [iconFile, setIconFile] = useState(null);
  const [iconPreview, setIconPreview] = useState("");

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [form] = Form.useForm();

  // Initialize data & reset form on type change
  useEffect(() => {
    setData(dummyDataByType[type] || []);
    resetModal();
    form.resetFields();
  }, [type]);

  useEffect(() => {
    if (isEditMode && editId !== null) {
      const item = data.find((d) => d.id === editId);
      if (item) {
        form.setFieldsValue({ name: item.name });
        if (type === "category") {
          setIconPreview(item.iconPreview || "");
          setIconFile(item.iconFile || null);
        } else {
          setIconPreview("");
          setIconFile(null);
        }
      }
    } else {
      form.resetFields();
      setIconPreview("");
      setIconFile(null);
    }
  }, [isEditMode, editId, data, type, form]);

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
        return Upload.LIST_IGNORE;
      }
      setIconFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setIconPreview(e.target.result);
      };
      reader.readAsDataURL(file);
      return false; // prevent upload
    },
    onRemove: () => {
      setIconFile(null);
      setIconPreview("");
    },
    maxCount: 1,
    showUploadList: false,
  };

  const handleAdd = async () => {
    try {
      const values = await form.validateFields();

      if (type === "category" && !iconFile) {
        message.error("Please upload an icon");
        return;
      }

      const formData = new FormData();
      formData.append("name", values.name);
      if (type === "category" && iconFile) {
        formData.append("icon", iconFile);
      }

      // Simulate API call:
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const newId =
        data.length > 0 ? Math.max(...data.map((d) => d.id)) + 1 : 1;
      const newItem =
        type === "category"
          ? { id: newId, name: values.name, iconFile, iconPreview }
          : { id: newId, name: values.name };

      setData([...data, newItem]);
      resetModal();
      form.resetFields();
    } catch {
      // validation failed; AntD shows error
    }
  };

  const handleEdit = async () => {
    try {
      const values = await form.validateFields();

      if (type === "category" && !iconFile) {
        message.error("Please upload an icon");
        return;
      }

      const formData = new FormData();
      formData.append("name", values.name);
      if (type === "category" && iconFile) {
        formData.append("icon", iconFile);
      }

      // Simulate API call:
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      setData((prev) =>
        prev.map((item) =>
          item.id === editId
            ? type === "category"
              ? { ...item, name: values.name, iconFile, iconPreview }
              : { ...item, name: values.name }
            : item
        )
      );
      resetModal();
      form.resetFields();
    } catch {
      // validation failed
    }
  };

  const handleDelete = () => {
    setData((prev) => prev.filter((item) => item.id !== deleteId));
    setIsDeleteModalVisible(false);
    setDeleteId(null);
  };

  const resetModal = () => {
    setIsModalVisible(false);
    setIsEditMode(false);
    setEditId(null);
    setIconFile(null);
    setIconPreview("");
    form.resetFields();
  };

  const openEditModal = (item) => {
    setIsEditMode(true);
    setEditId(item.id);
    setIsModalVisible(true);
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setIsDeleteModalVisible(true);
  };

  const renderIconPreview = (iconPreview) =>
    iconPreview ? (
      <img
        src={iconPreview}
        alt="icon"
        className="w-6 h-6 object-contain rounded"
      />
    ) : (
      <FaFolder />
    );

  const columns = [
    {
      title: "S. No",
      key: "id",
      render: (text, record, index) => index + 1,
      align: "center",
      width: 70,
    },
    ...(type === "category"
      ? [
          {
            title: "Icon",
            dataIndex: "iconPreview",
            key: "iconPreview",
            align: "center",
            width: 80,
            render: renderIconPreview,
          },
        ]
      : []),
    {
      title: type === "category" ? "Category" : "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <div className="flex justify-center gap-2">
          <Button
            type="primary"
            shape="round"
            onClick={() => openEditModal(record)}
          >
            <FaEdit />
          </Button>
          <Button
            type="danger"
            shape="round"
            onClick={() => openDeleteModal(record.id)}
          >
            <FaTrash />
          </Button>
        </div>
      ),
      width: 150,
    },
  ];

  return (
    <>
      <div className="flex justify-end mb-6">
        <Button
          type="primary"
          size="large"
          onClick={() => setIsModalVisible(true)}
        >
          Add {type === "category" ? "Category" : "Name"}
        </Button>
      </div>

      <div className="w-[50%]">
        <Table
          columns={columns}
          dataSource={data}
          rowKey={(record) => record.id}
          pagination={{
            current: page,
            pageSize: 10,
            showSizeChanger: false,
            onChange: (p) => setPage(p),
          }}
        />
      </div>

      {/* Add/Edit Modal */}
      <Modal
        title={`${isEditMode ? "Edit" : "Add"} ${
          type === "category" ? "Category" : "Name"
        }`}
        visible={isModalVisible}
        onCancel={resetModal}
        footer={null}
        centered
        width={400}
      >
        <Form form={form} layout="vertical" initialValues={{ name: "" }}>
          <Form.Item
            name="name"
            label={type === "category" ? "Category Name" : "Name"}
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input
              placeholder={type === "category" ? "Category Name" : "Name"}
              onChange={(e) => form.setFieldsValue({ name: e.target.value })}
              className="mb-4"
            />
          </Form.Item>

          {type === "category" && (
            <Form.Item
              label="Upload Icon"
              required
              // custom validator for iconFile
              rules={[
                {
                  validator: () =>
                    iconFile
                      ? Promise.resolve()
                      : Promise.reject("Please upload an icon"),
                },
              ]}
            >
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>Click to Upload Icon</Button>
              </Upload>
              {iconPreview && (
                <img
                  src={iconPreview}
                  alt="icon preview"
                  className="mt-4 w-12 h-12 object-contain border rounded"
                />
              )}
            </Form.Item>
          )}

          <Button
            type="primary"
            block
            onClick={isEditMode ? handleEdit : handleAdd}
            className="mt-4"
          >
            {isEditMode ? "Save Changes" : "Save"}
          </Button>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete Confirmation"
        open={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsDeleteModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="delete" type="danger" onClick={handleDelete}>
            Delete
          </Button>,
        ]}
        centered
        width={400}
      >
        <p>
          Are you sure you want to delete this{" "}
          {type === "category" ? "category" : "name"}?
        </p>
      </Modal>
    </>
  );
};

export default AddValue;
