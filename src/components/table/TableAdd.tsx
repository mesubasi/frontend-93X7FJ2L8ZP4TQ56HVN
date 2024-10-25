import { useState } from "react";
import { Button, Form, Input, message, Modal } from "antd";
import axios from "axios";

const TableAdd = () => {
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      await axios.post(`http://localhost:3000/users/save`, {
        name: values.name,
        surname: values.surname,
        email: values.email,
        password: values.password,
        phone: values.phone,
        age: values.age,
        country: values.country,
        district: values.district,
        role: values.role,
      });
      message.success("Kullanıcı başarıyla eklendi!");
      form.resetFields();
      setIsModalAddOpen(false);
    } catch (err) {
      console.log(err);
      message.error("Bir hata oluştu.");
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setIsModalAddOpen(true)}>
        Yeni Kullanıcı Ekle
      </Button>

      <Modal
        title="Add New User"
        open={isModalAddOpen}
        onCancel={() => setIsModalAddOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Name field cannot be empty!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="surname"
            label="Surname"
            rules={[
              { required: true, message: "Surname field cannot be empty!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Email field cannot be empty!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Password field cannot be empty!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Phone field cannot be empty!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true, message: "Age field cannot be empty!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="country"
            label="Country"
            rules={[
              { required: true, message: "Country field cannot be empty!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="district"
            label="District"
            rules={[
              { required: true, message: "District field cannot be empty!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Role field cannot be empty!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item className="flex justify-end mb-0">
            <Button type="primary" htmlType="submit">
              Oluştur
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TableAdd;
