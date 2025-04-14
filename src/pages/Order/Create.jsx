
import React from 'react';
import { Card, Form, Input, Button, Select, DatePicker, message } from 'antd';
import { FileAddOutlined, SearchOutlined } from '@ant-design/icons';

const { Option } = Select;
const { RangePicker } = DatePicker;

export default function OrderCreate() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values:', values);
    message.success('订单创建成功');
    // 这里将添加PDF生成逻辑
  };

  return (
    <Card title="创建订单">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="customerName"
          label="客户姓名"
          rules={[{ required: true, message: '请输入客户姓名' }]}
        >
          <Input placeholder="请输入客户姓名" />
        </Form.Item>

        <Form.Item
          name="customerPhone"
          label="客户电话"
          rules={[
            { required: true, message: '请输入客户电话' },
            { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
          ]}
        >
          <Input placeholder="请输入客户电话" />
        </Form.Item>

        <Form.Item
          name="worker"
          label="选择劳动者"
          rules={[{ required: true, message: '请选择劳动者' }]}
        >
          <Select
            showSearch
            placeholder="输入姓名或手机号搜索"
            optionFilterProp="children"
            suffixIcon={<SearchOutlined />}
          >
            <Option value="1">张三 (13800138000)</Option>
            <Option value="2">李四 (13900139000)</Option>
            {/* 实际项目中这里应该从API获取劳动者列表 */}
          </Select>
        </Form.Item>

        <Form.Item
          name="serviceAddress"
          label="服务地址"
          rules={[{ required: true, message: '请输入服务地址' }]}
        >
          <Input placeholder="请输入服务地址" />
        </Form.Item>

        <Form.Item
          name="contractPeriod"
          label="合同期限"
          rules={[{ required: true, message: '请选择合同期限' }]}
        >
          <RangePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="serviceType"
          label="服务类型"
          rules={[{ required: true, message: '请选择服务类型' }]}
        >
          <Select placeholder="请选择服务类型">
            <Option value="liveInNanny">住家保姆</Option>
            <Option value="hourlyWorker">小时工</Option>
            <Option value="daytimeNanny">白班保姆</Option>
            <Option value="daytimeBabysitter">白班育儿嫂</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<FileAddOutlined />}>
            生成合同并提交
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
