
import React, { useEffect, useState } from 'react';
import { Card, Descriptions, Button, Row, Col, Image } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

export default function ResumeDetail() {
  const { resumeId } = useParams();
  const [resumeData, setResumeData] = useState({});

  // 模拟从API获取数据
  useEffect(() => {
    // 这里应该是从API获取数据的逻辑
    // 暂时使用localStorage模拟
    const savedData = localStorage.getItem(`resume_${resumeId}`) || '{}';
    setResumeData(JSON.parse(savedData));
  }, [resumeId]);

  const displayValue = (value) => {
    return value || '待完善';
  };

  return (
    <Card 
      title="简历详情"
      extra={<Button type="primary" icon={<EditOutlined />}>编辑</Button>}
    >
      <Row gutter={[16, 16]}>
        {/* 个人信息 */}
        <Col span={24}>
          <Card 
            title="个人信息" 
            bordered={false}
            headStyle={{ fontSize: '16px', fontWeight: 'bold' }}
            bodyStyle={{ padding: '16px 24px' }}
            style={{ marginBottom: 16, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)' }}
          >
            <Descriptions 
              bordered 
              column={{ xs: 1, sm: 2 }}
              size="middle"
              labelStyle={{ width: '100px', fontWeight: 'normal' }}
              contentStyle={{ minWidth: '150px' }}
            >
            <Descriptions.Item label="简历编号">{resumeId}</Descriptions.Item>
            <Descriptions.Item label="姓名">{displayValue(resumeData.name)}</Descriptions.Item>
            <Descriptions.Item label="年龄">{displayValue(resumeData.age)}</Descriptions.Item>
            <Descriptions.Item label="手机号">{displayValue(resumeData.phone)}</Descriptions.Item>
            <Descriptions.Item label="身份证号">{displayValue(resumeData.idCard)}</Descriptions.Item>
            <Descriptions.Item label="生日">{displayValue(resumeData.birthday)}</Descriptions.Item>
            <Descriptions.Item label="性别">{displayValue(resumeData.gender === 'male' ? '男' : resumeData.gender === 'female' ? '女' : null)}</Descriptions.Item>
            <Descriptions.Item label="婚姻状况">{displayValue(resumeData.marriage === 'single' ? '未婚' : resumeData.marriage === 'married' ? '已婚' : resumeData.marriage === 'divorced' ? '离异' : resumeData.marriage === 'widowed' ? '丧偶' : null)}</Descriptions.Item>
            <Descriptions.Item label="籍贯">{displayValue(resumeData.hometown)}</Descriptions.Item>
            <Descriptions.Item label="户籍地址">{displayValue(resumeData.registeredAddress)}</Descriptions.Item>
            <Descriptions.Item label="学历">{displayValue(resumeData.education === 'none' ? '无学历' : resumeData.education === 'primary' ? '小学' : resumeData.education === 'junior' ? '初中' : resumeData.education === 'technical' ? '中专' : resumeData.education === 'vocational' ? '职高' : resumeData.education === 'senior' ? '高中' : resumeData.education === 'college' ? '大专' : resumeData.education === 'bachelor' ? '本科' : resumeData.education === 'master' ? '研究生及以上' : null)}</Descriptions.Item>
            <Descriptions.Item label="民族">{displayValue(resumeData.ethnicity)}</Descriptions.Item>
            <Descriptions.Item label="宗教信仰">{displayValue(resumeData.religion === 'buddhism' ? '佛教' : resumeData.religion === 'christianity' ? '基督教' : resumeData.religion === 'islam' ? '伊斯兰教' : resumeData.religion === 'taoism' ? '道教' : resumeData.religion === 'catholicism' ? '天主教' : null)}</Descriptions.Item>
            <Descriptions.Item label="微信号">{displayValue(resumeData.wechat)}</Descriptions.Item>
          </Descriptions>
          </Card>
        </Col>

        {/* 工作信息 */}
        <Col span={24}>
          <Card 
            title="工作信息" 
            bordered={false}
            headStyle={{ fontSize: '16px', fontWeight: 'bold' }}
            bodyStyle={{ padding: '16px 24px' }}
            style={{ marginBottom: 16, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)' }}
          >
            <Descriptions 
              bordered 
              column={{ xs: 1, sm: 2 }}
              size="middle"
              labelStyle={{ width: '100px', fontWeight: 'normal' }}
              contentStyle={{ minWidth: '150px' }}
            >
            <Descriptions.Item label="工种">{displayValue(resumeData.type === 'nanny' ? '月嫂' : resumeData.type === 'live_in_babysitter' ? '住家育儿嫂' : resumeData.type === 'cleaning' ? '保洁' : resumeData.type === 'live_in_housekeeper' ? '住家保姆' : resumeData.type === 'pet_care' ? '养宠' : resumeData.type === 'hourly_worker' ? '小时工' : resumeData.type === 'daytime_babysitter' ? '白班育儿' : resumeData.type === 'daytime_housekeeper' ? '白班保姆' : null)}</Descriptions.Item>
            <Descriptions.Item label="接单状态">{displayValue(resumeData.orderStatus === 'accepting' ? '想接单' : resumeData.orderStatus === 'not_accepting' ? '不接单' : resumeData.orderStatus === 'on_duty' ? '已上户' : null)}</Descriptions.Item>
            <Descriptions.Item label="期望薪资">{displayValue(resumeData.expectedSalary)} 元</Descriptions.Item>
            <Descriptions.Item label="接单地址">{displayValue(resumeData.serviceAddress)}</Descriptions.Item>
            <Descriptions.Item label="工作经验">{displayValue(resumeData.workExperienceYears)} 年</Descriptions.Item>
            <Descriptions.Item label="技能标签">
              {resumeData.skills?.length > 0 ? 
                resumeData.skills.join(', ') : '待完善'}
            </Descriptions.Item>
          </Descriptions>
          </Card>
        </Col>

        {/* 证件照片 */}
        <Col span={24}>
          <Card 
            title="证件照片" 
            bordered={false}
            headStyle={{ fontSize: '16px', fontWeight: 'bold' }}
            bodyStyle={{ padding: '16px 24px' }}
            style={{ marginBottom: 16, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)' }}
          >
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <div style={{ marginBottom: 8, color: 'rgba(0,0,0,0.65)' }}>身份证照片</div>
                {resumeData.idCard?.front ? (
                  <Image
                    width="100%"
                    style={{ maxWidth: 300, borderRadius: 4 }}
                    src={resumeData.idCard.front}
                  />
                ) : (
                  <div style={{ color: 'rgba(0,0,0,0.25)' }}>待完善</div>
                )}
              </Col>
              <Col xs={24} sm={12}>
                <div style={{ marginBottom: 8, color: 'rgba(0,0,0,0.65)' }}>个人照片</div>
                {resumeData.photos?.length > 0 ? (
                  <Image
                    width="100%"
                    style={{ maxWidth: 300, borderRadius: 4 }}
                    src={resumeData.photos[0]}
                  />
                ) : (
                  <div style={{ color: 'rgba(0,0,0,0.25)' }}>待完善</div>
                )}
              </Col>
            </Row>
          </Card>
        </Col>

        {/* 体检报告 */}
        <Col span={24}>
          <Card 
            title="体检报告" 
            bordered={false}
            headStyle={{ fontSize: '16px', fontWeight: 'bold' }}
            bodyStyle={{ padding: '16px 24px' }}
            style={{ marginBottom: 16, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)' }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <div style={{ marginBottom: 8, color: 'rgba(0,0,0,0.65)' }}>体检时间</div>
                <div>{displayValue(resumeData.medicalCheckDate)}</div>
              </Col>
              <Col span={24}>
                <div style={{ marginBottom: 8, color: 'rgba(0,0,0,0.65)' }}>体检报告</div>
                {resumeData.medicalReports?.length > 0 ? (
                  <Row gutter={16}>
                    {resumeData.medicalReports.map((report, index) => (
                      <Col key={index} xs={24} sm={12} md={8}>
                        <Image
                          width="100%"
                          style={{ maxWidth: 300, borderRadius: 4 }}
                          src={report.url || report.preview}
                        />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <div style={{ color: 'rgba(0,0,0,0.25)' }}>待完善</div>
                )}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Card>
  );
}
