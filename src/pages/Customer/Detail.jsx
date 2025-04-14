
import React from 'react';
import { Card, Descriptions, Button, Tabs, Tag } from 'antd';
import { EditOutlined, FileTextOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

export default function CustomerDetail() {
  return (
    <Card 
      title="客户详情"
      extra={
        <Button type="primary" icon={<EditOutlined />}>
          编辑
        </Button>
      }
    >
      <Tabs defaultActiveKey="basic">
        <TabPane tab="基本信息" key="basic">
          <Descriptions bordered column={2}>
            <Descriptions.Item label="姓名">李四</Descriptions.Item>
            <Descriptions.Item label="电话">13900139000</Descriptions.Item>
            <Descriptions.Item label="来源">
              <Tag color="blue">美团</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="需求品类">月嫂</Descriptions.Item>
            <Descriptions.Item label="线索等级">
              <Tag color="green">A类</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="创建时间">2023-05-15</Descriptions.Item>
          </Descriptions>
        </TabPane>
        
        <TabPane tab="订单记录" key="orders" icon={<FileTextOutlined />}>
          {/* 订单记录表格将在这里实现 */}
        </TabPane>
      </Tabs>
    </Card>
  );
}
