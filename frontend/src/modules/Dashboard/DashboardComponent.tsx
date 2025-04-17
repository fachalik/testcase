/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Card, Col, List, Row, Typography } from "antd";

// Ant Design Typography Components
const { Title, Text } = Typography;

// Define types for the data
interface Barang {
  id: string;
  name: string;
  price: number;
  description: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    barang: number;
  };
}

interface DashboardData {
  totalBarangUser: number;
  totalBarang: number;
  totalUsers: number;
  totalPrice: number;
  topExpensiveBarang: Barang[];
  topUser: User;
  barangPerUser: { id: string; name: string; _count: { barang: number } }[];
}

interface DashboardProps {
  data: DashboardData | any;
}

const DashboardComponent: React.FC<DashboardProps> = ({ data }) => {
  // Check if data is null or an empty object
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="p-6 space-y-6">
        <Title level={1} className="text-3xl font-bold">
          📊 Dashboard
        </Title>
        <Card className="shadow-xl" bordered={false}>
          <Text className="text-lg">No data available</Text>
        </Card>
      </div>
    );
  }

  const {
    totalBarangUser,
    totalBarang,
    totalUsers,
    totalPrice,
    topExpensiveBarang,
    topUser,
    barangPerUser,
  } = data;

  return (
    <div className="p-6 space-y-6">
      <Title level={1} className="text-3xl font-bold">
        📊 Dashboard
      </Title>

      {/* Summary Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card className="shadow-xl" title="Total Users" bordered={false}>
            <Text className="text-2xl font-semibold">{totalUsers}</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="shadow-xl" title="Total Barang" bordered={false}>
            <Text className="text-2xl font-semibold">{totalBarang}</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="shadow-xl" title="Barang per User" bordered={false}>
            <Text className="text-2xl font-semibold">{totalBarangUser}</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="shadow-xl" title="Total Price" bordered={false}>
            <Text className="text-2xl font-semibold">
              Rp {totalPrice.toLocaleString()}
            </Text>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24}>
          {/* Top Expensive Barang */}
          <Card
            className="shadow-xl"
            title="🔥 Top Expensive Barang"
            bordered={false}
          >
            <ul className="space-y-2">
              <List
                className="demo-loadmore-list"
                // loading={initLoading}
                itemLayout="horizontal"
                // loadMore={loadMore}
                dataSource={topExpensiveBarang}
                renderItem={(item: Barang) => (
                  <List.Item>
                    <List.Item.Meta
                      title={<p>{item.name}</p>}
                      description={item.description}
                    />
                    <div> Rp {item.price.toLocaleString()}</div>
                  </List.Item>
                )}
              />
            </ul>
          </Card>
        </Col>

        <Col xs={24}>
          {/* Top User */}
          <Card className="shadow-xl" title="🏆 Top User" bordered={false}>
            <div>
              <Text className="text-lg font-medium me-4">{topUser.name}</Text>
              <Text className="text-sm text-gray-500">{topUser.email}</Text>
              <div className="mt-2">
                <Text className="text-sm">
                  Total Barang: {topUser._count.barang}
                </Text>
              </div>
            </div>
          </Card>
        </Col>
        {/* Barang per User */}

        <Col xs={24}>
          <Card
            className="shadow-xl"
            title="📦 Barang Per User"
            bordered={false}
          >
            <List
              className="demo-loadmore-list"
              // loading={initLoading}
              itemLayout="horizontal"
              // loadMore={loadMore}
              dataSource={barangPerUser}
              renderItem={(item: {
                id: string;
                name: string;
                _count: { barang: number };
              }) => (
                <List.Item>
                  <List.Item.Meta
                    title={<p>{item.id}</p>}
                    description={item.name}
                  />
                  <div> {item._count.barang} barang</div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardComponent;
