
import React from 'react';
import { Card, Descriptions, Button, Tabs } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

export default function ResumeDetail() {
  return (
    <Card 
      title="简历详情"
      extra={<Button type="primary" icon={<EditOutlined />}>编辑</Button>}
    >
      <Tabs defaultActiveKey="basic">
        <TabPane tab="基本信息" key="basic">
          <Descriptions bordered column={2}>
            <Descriptions.Item label="姓名">张三</Descriptions.Item>
            <Descriptions.Item label="手机号">13800138000</Descriptions.Item>
            <Descriptions.Item label="身份证号">110***************</Descriptions.Item>
            <Descriptions.Item label="工种">月嫂</Descriptions.Item>
            {/* 其他信息展示... */}
          </Descriptions>
        </TabPane>
        
        <TabPane tab="工作经历" key="experience">
          {/* 工作经历展示 */}
        </TabPane>
        
        <TabPane tab="技能证书" key="certificates">
          {/* 证书展示 */}
        </TabPane>
      </Tabs>
    </Card>
  );
}
