
import React from 'react';
import { Card, Table, Input, Button, Select, Space } from 'antd';
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Search } = Input;

export default function CustomerList() {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '来源',
      dataIndex: 'source',
      key: 'source',
      render: (text) => (
        <span>{['美团','抖音','快手','小红书','社群线索','转介绍','其他'][text]}</span>
      )
    },
    {
      title: '需求',
      dataIndex: 'need',
      key: 'need',
    },
    {
      title: '签约状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>查看</a>
          <a>编辑</a>
        </Space>
      ),
    },
  ];

  return (
    <Card 
      title="客户列表"
      extra={
        <Button type="primary" icon={<UserAddOutlined />}>
          创建客户
        </Button>
      }
    >
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="输入姓名/电话搜索"
          allowClear
          style={{ width: 200 }}
        />
        <Select placeholder="来源" style={{ width: 120 }}>
          <Option value="0">美团</Option>
          <Option value="1">抖音</Option>
          {/* 其他来源选项... */}
        </Select>
        <Button type="primary" icon={<SearchOutlined />}>
          搜索
        </Button>
      </Space>
      <Table
        columns={columns}
        // dataSource={data}
        rowKey="id"
      />
    </Card>
  );
}
