
import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Card, Descriptions, Button, Row, Col } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const isValidDate = (dateString, createDate) => {
  if (!dateString || !createDate) return true;
  return new Date(dateString) <= new Date(createDate);
};

const formatYearMonth = (dateString, createDate) => {
  if (!dateString) return '';
  if (!isValidDate(dateString, createDate)) return '日期无效';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}年${month}月`;
};

const formatDate = (dateString, createDate) => {
  if (!dateString) return '';
  if (!isValidDate(dateString, createDate)) return '日期无效';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const renderField = (value, mapping = null) => {
  if (value === undefined || value === null || value === '') return '-';
  if (mapping && mapping[value]) return mapping[value];
  return value;
};

export default function ResumeDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const data = state?.workerData || null;

  // 定义所有可能的映射关系
  const mappings = {
    gender: { male: '男', female: '女' },
    marriage: { single: '未婚', married: '已婚', divorced: '离异', widowed: '丧偶' },
    education: {
      none: '无学历', primary: '小学', junior: '初中', technical: '中专',
      vocational: '职高', senior: '高中', college: '大专', bachelor: '本科', master: '研究生及以上'
    },
    religion: {
      buddhism: '佛教', christianity: '基督教', islam: '伊斯兰教',
      taoism: '道教', catholicism: '天主教'
    },
    zodiac: {
      rat: '鼠', ox: '牛', tiger: '虎', rabbit: '兔', dragon: '龙',
      snake: '蛇', horse: '马', goat: '羊', monkey: '猴', rooster: '鸡',
      dog: '狗', pig: '猪'
    },
    constellation: {
      aries: '白羊座', taurus: '金牛座', gemini: '双子座', cancer: '巨蟹座',
      leo: '狮子座', virgo: '处女座', libra: '天秤座', scorpio: '天蝎座',
      sagittarius: '射手座', capricorn: '摩羯座', aquarius: '水瓶座', pisces: '双鱼座'
    },
    type: {
      nanny: '月嫂', live_in_babysitter: '住家育儿嫂', cleaning: '保洁',
      live_in_housekeeper: '住家保姆', pet_care: '养宠', hourly_worker: '小时工',
      daytime_babysitter: '白班育儿', daytime_housekeeper: '白班保姆'
    },
    orderStatus: { accepting: '想接单', not_accepting: '不接单', on_duty: '已上户' }
  };

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
        <>
          {/* 个人信息部分 */}
          <Descriptions bordered title="个人信息" style={{ marginBottom: 24 }} column={3}>
            <Descriptions.Item label="简历ID" span={1}>{renderField(data.id)}</Descriptions.Item>
            <Descriptions.Item label="姓名" span={1}>{renderField(data.name)}</Descriptions.Item>
            <Descriptions.Item label="年龄" span={1}>{renderField(data.age)}</Descriptions.Item>
            <Descriptions.Item label="性别" span={1}>{renderField(data.gender, mappings.gender)}</Descriptions.Item>
            <Descriptions.Item label="手机号" span={1}>{renderField(data.phone)}</Descriptions.Item>
            <Descriptions.Item label="微信号" span={1}>{renderField(data.wechat)}</Descriptions.Item>
            <Descriptions.Item label="身份证号" span={1}>{renderField(data.idCard)}</Descriptions.Item>
            <Descriptions.Item label="出生日期" span={1}>{renderField(data.birthday)}</Descriptions.Item>
            <Descriptions.Item label="婚姻状况" span={1}>{renderField(data.marriage, mappings.marriage)}</Descriptions.Item>
            <Descriptions.Item label="宗教信仰" span={1}>{renderField(data.religion, mappings.religion)}</Descriptions.Item>
            <Descriptions.Item label="籍贯" span={1}>{renderField(data.hometown)}</Descriptions.Item>
            <Descriptions.Item label="户籍地址" span={1}>{renderField(data.registeredAddress)}</Descriptions.Item>
            <Descriptions.Item label="学历" span={1}>{renderField(data.education, mappings.education)}</Descriptions.Item>
            <Descriptions.Item label="民族" span={1}>{renderField(data.ethnicity)}</Descriptions.Item>
            <Descriptions.Item label="生肖" span={1}>{renderField(data.zodiac, mappings.zodiac)}</Descriptions.Item>
            <Descriptions.Item label="星座" span={1}>{renderField(data.constellation, mappings.constellation)}</Descriptions.Item>
          </Descriptions>

          {/* 工作信息部分 */}
          <Descriptions bordered title="工作信息" style={{ marginBottom: 24 }} column={3}>
            <Descriptions.Item label="工种" span={1}>{renderField(data.type, mappings.type)}</Descriptions.Item>
            <Descriptions.Item label="接单状态" span={1}>{renderField(data.orderStatus, mappings.orderStatus)}</Descriptions.Item>
            <Descriptions.Item label="期望薪资" span={1}>{renderField(data.expectedSalary)}元</Descriptions.Item>
            <Descriptions.Item label="接单地址" span={1}>{renderField(data.serviceAddress)}</Descriptions.Item>
            <Descriptions.Item label="从业年限" span={1}>{renderField(data.workExperienceYears)}年</Descriptions.Item>
            <Descriptions.Item label="技能标签" span={1}>
              {data.skills ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {data.skills.map((skill, index) => (
                    <span key={index} style={{
                      padding: '4px 8px',
                      backgroundColor: '#f0f0f0',
                      borderRadius: 4,
                      fontSize: 12
                    }}>
                      {renderField(skill, {
                        'maternal_care': '母婴护理师',
                        'lactation': '催乳',
                        'postpartum_meals': '月子餐',
                        'postpartum_recovery': '产后修复',
                        'special_infant_care': '特殊婴儿护理',
                        'medical_background': '医疗背景',
                        'nanny': '育婴师',
                        'early_education': '早教',
                        'baby_food': '辅食',
                        'infant_massage': '儿推',
                        'foreign_language': '外语',
                        'chinese_cuisine': '中餐',
                        'western_cuisine': '西餐',
                        'flour_food': '面食',
                        'driving': '驾驶',
                        'organization': '整理收纳'
                      })}
                    </span>
                  ))}
                </div>
              ) : '-'}
            </Descriptions.Item>
          </Descriptions>

          {/* 工作经历部分 */}
          {data.workExperiences && data.workExperiences.length > 0 && (
            <Card title="工作经历" style={{ marginBottom: 24 }}>
              {data.workExperiences.map((exp, index) => (
                <div key={index} style={{ marginBottom: 16 }}>
                  <Descriptions bordered column={2}>
                    <Descriptions.Item label="工作时间" span={1}>
                      {exp.period ? (
                        <>
                          {formatYearMonth(exp.period[0], data.createTime)} - {formatYearMonth(exp.period[1], data.createTime)}
                        </>
                      ) : '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="工作内容" span={1}>
                      {renderField(exp.description)}
                    </Descriptions.Item>
                  </Descriptions>
                </div>
              ))}
            </Card>
          )}

          {/* 身份证照片部分 */}
          <Card title="身份证照片" style={{ marginBottom: 24 }}>
            <Row gutter={16}>
              <Col span={12}>
                <Card title="人像面" size="small">
                  {data.idCard?.front ? (
                    <img 
                      src={data.idCard.front} 
                      alt="身份证人像面" 
                      style={{ width: '100%', maxHeight: 300, objectFit: 'contain' }}
                    />
                  ) : (
                    <div style={{ textAlign: 'center', padding: '40px 0', color: 'rgba(0,0,0,0.45)' }}>
                      未上传人像面照片
                    </div>
                  )}
                </Card>
              </Col>
              <Col span={12}>
                <Card title="国徽面" size="small">
                  {data.idCard?.back ? (
                    <img 
                      src={data.idCard.back} 
                      alt="身份证国徽面" 
                      style={{ width: '100%', maxHeight: 300, objectFit: 'contain' }}
                    />
                  ) : (
                    <div style={{ textAlign: 'center', padding: '40px 0', color: 'rgba(0,0,0,0.45)' }}>
                      未上传国徽面照片
                    </div>
                  )}
                </Card>
              </Col>
            </Row>
          </Card>

          {/* 文件信息部分 */}
          <Descriptions bordered title="附件信息" column={2}>
            <Descriptions.Item label="体检报告" span={1}>
              {data.medicalReports ? (
                <a href={data.medicalReports.url} target="_blank" rel="noopener noreferrer">
                  {data.medicalReports.name || '查看报告'}
                </a>
              ) : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="体检日期" span={1}>
              {data.medicalCheckDate ? formatDate(data.medicalCheckDate, data.createTime) : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="个人照片" span={1}>
              {data.photos ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {data.photos.map((photo, index) => (
                    <a key={index} href={photo.url} target="_blank" rel="noopener noreferrer">
                      {photo.name || `照片${index + 1}`}
                    </a>
                  ))}
                </div>
              ) : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="技能证书" span={1}>
              {data.certificates ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {data.certificates.map((cert, index) => (
                    <a key={index} href={cert.url} target="_blank" rel="noopener noreferrer">
                      {cert.name || `证书${index + 1}`}
                    </a>
                  ))}
                </div>
              ) : '-'}
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Card>
  );
}
