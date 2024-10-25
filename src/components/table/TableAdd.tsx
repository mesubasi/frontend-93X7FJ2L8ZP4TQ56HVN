import { useState } from "react";
import { Button, Form, Input, message, Modal } from "antd";
import axios from "axios";

const TableAdd = () => {
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [form] = Form.useForm();

  const API = import.meta.env.VITE_API_URI || "http://localhost:3000";

  const onFinish = async (values: any) => {
    try {
      await axios.post(API + `/users/save`, {
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
        title="Yeni Kullanıcı Ekle"
        open={isModalAddOpen}
        onCancel={() => setIsModalAddOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Ad Boş Olamaz!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="surname"
            label="Surname"
            rules={[{ required: true, message: "Soyad Boş Olamaz!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Email Boş Olamaz!" },
              { type: "email", message: "Geçerli bir Email adresi girin!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Parola boş olamaz!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: "Telefon boş olamaz!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true, message: "Yaş boş olamaz!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="country"
            label="Country"
            rules={[{ required: true, message: "Ülke boş olamaz!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="district"
            label="District"
            rules={[{ required: true, message: "Bölge boş olamaz!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Rol boş olamaz!" }]}
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
