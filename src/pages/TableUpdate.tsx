import { Button, Form, Input, Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const TableUpdate = ({ record }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    await updateUsers(record.key, values);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const updateUsers = async (id: number, values: any) => {
    try {
      const res = await axios.put(`${process.env.API_URI}/users/update/${id}`, {
        name: values.name,
        surname: values.surname,
        email: values.email,
        password: values.password,
        phone: values.phone,
        age: values.age,
        country: values.country,
        district: values.district,
        role: values.role,
        updatedat: values.updatedat,
      });
      console.log("Güncelleme Başarılı:", res.data);
    } catch (err) {
      console.log("Güncelleme İşleminde Bir Sorun Oluştu!", err);
    }
  };

  return (
    <div>
      <Modal
        title="Kullanıcı Güncelle"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Ad"
            rules={[{ required: true, message: "Ad alanı zorunludur!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="surname"
            label="Soyad"
            rules={[{ required: true, message: "Soyad alanı zorunludur!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Email alanı zorunludur!" },
              { type: "email", message: "Geçerli bir email giriniz!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Şifre"
            rules={[{ required: true, message: "Şifre alanı zorunludur!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Telefon"
            rules={[{ required: true, message: "Telefon alanı zorunludur!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="Yaş"
            rules={[{ required: true, message: "Yaş alanı zorunludur!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="country"
            label="Ülke"
            rules={[{ required: true, message: "Ülke alanı zorunludur!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="district"
            label="İlçe"
            rules={[{ required: true, message: "İlçe alanı zorunludur!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Rol"
            rules={[{ required: true, message: "Rol alanı zorunludur!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TableUpdate;
