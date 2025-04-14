
import React from 'react';
import { Card, Form, Input, Button, Select, DatePicker, message } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

export default function CustomerCreate() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values:', values);
    message.success('客户创建成功');
  };

  return (
    <Card title="创建客户">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="姓名"
          rules={[{ required: true, message: '请输入客户姓名' }]}
        >
          <Input placeholder="请输入客户姓名" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="电话"
          rules={[
            { required: true, message: '请输入电话' },
            { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
          ]}
        >
          <Input placeholder="请输入电话" />
        </Form.Item>

        <Form.Item
          name="source"
          label="来源"
          rules={[{ required: true, message: '请选择来源' }]}
        >
          <Select placeholder="请选择来源">
            <Option value="0">美团</Option>
            <Option value="1">抖音</Option>
            <Option value="2">快手</Option>
            <Option value="3">小红书</Option>
            <Option value="4">社群线索</Option>
            <Option value="5">转介绍</Option>
            <Option value="6">其他</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="level"
          label="线索等级"
          rules={[{ required: true, message: '请选择线索等级' }]}
        >
          <Select placeholder="请选择线索等级">
            <Option value="A">A类</Option>
            <Option value="B">B类</Option>
            <Option value="C">C类</Option>
            <Option value="D">D类</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="need"
          label="需求品类"
          rules={[{ required: true, message: '请选择需求品类' }]}
        >
          <Select placeholder="请选择需求品类">
            <Option value="nanny">月嫂</Option>
            <Option value="babysitter">育儿嫂</Option>
            <Option value="cleaner">保洁</Option>
            <Option value="housekeeper">保姆</Option>
            {/* 其他需求选项... */}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<UserAddOutlined />}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
