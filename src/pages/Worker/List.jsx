
import React from 'react';
import { Card, Form, Input, Button, Select, Table, Space } from 'antd';
import { SearchOutlined, SyncOutlined } from '@ant-design/icons';

const { Option } = Select;

export default function ResumeList() {
  const [form] = Form.useForm();
  
  const columns = [
    {
      title: '简历ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    // 其他列定义...
  ];

  return (
    <Card title="劳动者简历列表">
      <Form form={form} layout="inline">
        <Form.Item name="name" label="姓名">
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item name="phone" label="手机号">
          <Input placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item name="status" label="接单状态">
          <Select style={{ width: 120 }}>
            <Option value="want">想接单</Option>
            <Option value="not">不接单</Option>
            <Option value="working">已上户</Option>
            <Option value="pending">待定</Option>
          </Select>
        </Form.Item>
        <Space>
          <Button type="primary" icon={<SearchOutlined />}>查询</Button>
          <Button icon={<SyncOutlined />}>重置</Button>
        </Space>
      </Form>
      
      <Table
        style={{ marginTop: 16 }}
        columns={columns}
        // dataSource={data}
        rowKey="id"
      />
    </Card>
  );
}
