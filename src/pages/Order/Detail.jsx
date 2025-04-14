
import React from 'react';
import { Card, Descriptions, Button, Tabs, Tag, Space } from 'antd';
import { FilePdfOutlined, DownloadOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

export default function OrderDetail() {
  return (
    <Card 
      title="订单详情"
      extra={
        <Space>
          <Button icon={<DownloadOutlined />}>下载合同</Button>
          <Button type="primary" icon={<FilePdfOutlined />}>预览合同</Button>
        </Space>
      }
    >
      <Tabs defaultActiveKey="basic">
        <TabPane tab="基本信息" key="basic">
          <Descriptions bordered column={2}>
            <Descriptions.Item label="订单号">HT-202306001</Descriptions.Item>
            <Descriptions.Item label="客户姓名">王五</Descriptions.Item>
            <Descriptions.Item label="客户电话">13700137000</Descriptions.Item>
            <Descriptions.Item label="劳动者姓名">张三</Descriptions.Item>
            <Descriptions.Item label="劳动者电话">13800138000</Descriptions.Item>
            <Descriptions.Item label="服务地址">北京市朝阳区XX小区1号楼101</Descriptions.Item>
            <Descriptions.Item label="合同期限">
              2023-06-01 至 2023-12-01
            </Descriptions.Item>
            <Descriptions.Item label="合同状态">
              <Tag color="green">有效</Tag>
            </Descriptions.Item>
          </Descriptions>
        </TabPane>
        
        <TabPane tab="服务内容" key="service">
          <Descriptions bordered column={1}>
            <Descriptions.Item label="服务类型">住家保姆</Descriptions.Item>
            <Descriptions.Item label="服务内容">
              <Tag>做饭</Tag>
              <Tag>做家务</Tag>
              <Tag>照顾老人</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="劳动者工资">¥8000/月</Descriptions.Item>
          </Descriptions>
        </TabPane>
      </Tabs>
    </Card>
  );
}
