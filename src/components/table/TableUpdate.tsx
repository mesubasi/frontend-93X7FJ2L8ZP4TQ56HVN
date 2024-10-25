import { Button, Form, Input, message, Modal } from "antd";
import axios from "axios";
import { useEffect } from "react";

interface UserFormValues {
  name: string;
  surname: string;
  email: string;
  password: string;
  phone: string;
  age: number;
  country: string;
  district: string;
  role: string;
}

interface TableUpdateProps {
  userData?: UserFormValues;
  userId?: string;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  onUpdateSuccess?: () => void;
}

const TableUpdate = ({
  userData,
  userId,
  isModalOpen,
  setIsModalOpen,
  onUpdateSuccess,
}: TableUpdateProps) => {
  const [form] = Form.useForm();
  const API = import.meta.env.VITE_API_URI || "http://localhost:3000";

  useEffect(() => {
    if (userData && isModalOpen) {
      form.setFieldsValue(userData);
    }
  }, [userData, isModalOpen, form]);

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const onFinish = async (values: UserFormValues) => {
    try {
      await axios.put(`${API}/users/update/${userId}`, {
        ...values,
        updatedat: new Date(),
      });

      message.success("Güncelleme Başarılı");
      handleCancel();
      onUpdateSuccess?.();
    } catch (err) {
      message.error("Güncelleme İşleminde Bir Sorun Oluştu!");
      console.error(err);
    }
  };

  return (
    <Modal
      title="Kullanıcı Güncelle"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Ad"
          rules={[{ required: true, message: "Ad Boş Olamaz!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="surname"
          label="Soyad"
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
          label="Parola"
          rules={[{ required: true, message: "Parola boş olamaz!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Telefon"
          rules={[{ required: true, message: "Telefon boş olamaz!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="age"
          label="Yaş"
          rules={[{ required: true, message: "Yaş boş olamaz!" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="country"
          label="Ülke"
          rules={[{ required: true, message: "Ülke boş olamaz!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="district"
          label="Bölge"
          rules={[{ required: true, message: "Bölge boş olamaz!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="role"
          label="Rol"
          rules={[{ required: true, message: "Rol boş olamaz!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item className="flex justify-end mb-0">
          <Button type="primary" htmlType="submit">
            Güncelle
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TableUpdate;
