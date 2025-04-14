
import React from 'react';
import { Card, Table, Tag, Space, Button, Input } from 'antd';
import { SearchOutlined, FileAddOutlined } from '@ant-design/icons';

const { Search } = Input;

export default function OrderList() {
  const columns = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
      render: (text) => <a>HT-{text}</a>,
    },
    {
      title: '客户姓名',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: '劳动者姓名',
      dataIndex: 'workerName',
      key: 'workerName',
    },
    {
      title: '合同状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = '';
        if (status === 'valid') color = 'green';
        if (status === 'pending') color = 'orange';
        if (status === 'expired') color = 'red';
        return (
          <Tag color={color}>
            {status === 'valid' ? '有效' : status === 'pending' ? '待续约' : '已过期'}
          </Tag>
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>查看</a>
          <a>续约</a>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="订单列表"
      extra={
        <Button type="primary" icon={<FileAddOutlined />}>
          创建订单
        </Button>
      }
    >
      <Search
        placeholder="输入订单号/客户/劳动者搜索"
        allowClear
        enterButton={<SearchOutlined />}
        style={{ width: 300, marginBottom: 16 }}
      />
      <Table
        columns={columns}
        // dataSource={data}
        rowKey="orderNo"
      />
    </Card>
  );
}
