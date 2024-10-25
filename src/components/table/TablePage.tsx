import { Button, Input, Pagination, Space, Table, TableProps, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TableAdd from "./TableAdd";
import dotenv from "dotenv";
import TableUpdate from "../../pages/TableUpdate";
dotenv.config();

interface DataType {
  key: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  phone: string;
  age: number;
  country: string;
  district: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const TablePage = () => {
  const [table, setTable] = useState<DataType[]>([]);
  const [user, setTotalUser] = useState<number>(0);
  const [pages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<DataType | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
      render: (text) => {
        return <span>{text.substring(0, 15) + "..."}</span>;
      },
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "District",
      dataIndex: "district",
      key: "district",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text) => {
        let color = text === "admin" ? "green" : "red";
        return (
          <span>
            <Tag color={color}>{text}</Tag>
          </span>
        );
      },
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "updatedAt",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setSelectedUser(record);
              setIsModalVisible(true);
            }}
          >
            Güncelle
          </Button>
        </Space>
      ),
    },
  ];

  const API = process.env.API_URI;
  const getUsers = async (page: number, search: string = "") => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${API}/users?page=${page}&pageSize=${pageSize}&search=${search}`
      );

      const data = res.data.data.map((user: any) => ({
        key: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: user.password,
        phone: user.phone,
        age: user.age,
        country: user.country,
        district: user.district,
        role: user.role,
        createdAt: user.createdat,
        updatedAt: user.updatedat,
      }));
      setTotalUser(res.data.totalItems);
      setTotalPages(res.data.totalPages);
      setTable(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    getUsers(page, searchTerm);
  };

  const handleSizeChange = (current: number, size: number) => {
    setPageSize(size);
    setCurrentPage(1);
    getUsers(1, searchTerm);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    getUsers(currentPage, searchTerm);
  }, [searchTerm, pageSize, currentPage]);

  return (
    <div>
      <div className="flex justify-between pt-5 mx-10">
        <h1 className="font-bold">Full-Stack Görevi</h1>
        <Input
          placeholder="Ara..."
          onChange={handleSearch}
          style={{ marginBottom: 10, width: 600 }}
        />
        <TableAdd />
      </div>
      <Table<DataType>
        columns={columns}
        dataSource={table}
        pagination={false}
        scroll={{ x: "max-content" }}
        rowKey="key"
      />
      <div className="flex justify-center my-5">
        <Pagination
          showQuickJumper
          current={currentPage}
          pageSize={pageSize}
          total={user}
          defaultCurrent={2}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={true}
          onShowSizeChange={handleSizeChange}
          showTotal={(total) => `Toplam ${total} kayıt`}
        />
      </div>
    </div>
  );
};

export default TablePage;
