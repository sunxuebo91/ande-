
import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Card, Descriptions, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export default function ResumeDetail() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  
  // 直接从路由state获取数据
  const data = state?.workerData || null;

  return (
    <Card 
      title={
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate(-1)}
        >
          返回
        </Button>
      }
    >
      {!data ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <p style={{ color: 'rgba(0,0,0,0.45)' }}>未找到简历数据</p>
        </div>
      ) : (
        <Descriptions bordered column={2}>
          <Descriptions.Item label="简历ID">{data.id}</Descriptions.Item>
          <Descriptions.Item label="姓名">{data.name}</Descriptions.Item>
          <Descriptions.Item label="年龄">{data.age}</Descriptions.Item>
          <Descriptions.Item label="手机号">{data.phone}</Descriptions.Item>
          <Descriptions.Item label="籍贯">{data.hometown}</Descriptions.Item>
          <Descriptions.Item label="工种">
            {{
              'nanny': '月嫂',
              'live_in_babysitter': '住家育儿嫂',
              'cleaning': '保洁',
              'live_in_housekeeper': '住家保姆',
              'pet_care': '养宠',
              'hourly_worker': '小时工',
              'daytime_babysitter': '白班育儿',
              'daytime_housekeeper': '白班保姆'
            }[data.type] || data.type}
          </Descriptions.Item>
          <Descriptions.Item label="接单状态">
            {{
              'accepting': '想接单',
              'not_accepting': '不接单',
              'on_duty': '已上户'
            }[data.orderStatus] || data.orderStatus}
          </Descriptions.Item>
          <Descriptions.Item label="期望薪资">{data.expectedSalary}元</Descriptions.Item>
          <Descriptions.Item label="工作经验">{data.workExperienceYears}年</Descriptions.Item>
        </Descriptions>
      )}
    </Card>
  );
}
