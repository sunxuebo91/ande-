
import React, { useState } from 'react';
import { Card, Form, Input, InputNumber, Button, Select, Upload, DatePicker, message, ConfigProvider } from 'antd';
import { UploadOutlined, EnvironmentOutlined, PlusOutlined } from '@ant-design/icons';
import zhCN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

const { Option } = Select;
const { TextArea } = Input;

export default function ResumeCreate() {
  const [form] = Form.useForm();
  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  const onFinish = (values) => {
    console.log('Received values:', values);
    message.success('简历创建成功');
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <ConfigProvider locale={zhCN}>
      <Card title="创建劳动者简历">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>

          <Form.Item
            name="age"
            label="年龄"
            rules={[{ required: true, message: '请输入年龄' }]}
          >
            <InputNumber 
              style={{ width: '100%' }}
              min={18}
              max={65}
              placeholder="请输入年龄"
            />
          </Form.Item>

          <Form.Item
            name="wechat"
            label="微信号"
          >
            <Input placeholder="选填微信号" />
          </Form.Item>

          <Form.Item
            name="education"
            label="学历"
            rules={[{ required: true, message: '请选择学历' }]}
          >
            <Select placeholder="请选择学历">
              <Option value="none">无学历</Option>
              <Option value="primary">小学</Option>
              <Option value="junior">初中</Option>
              <Option value="technical">中专</Option>
              <Option value="vocational">职高</Option>
              <Option value="senior">高中</Option>
              <Option value="college">大专</Option>
              <Option value="bachelor">本科</Option>
              <Option value="master">研究生及以上</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="marriage"
            label="婚姻状况"
            rules={[{ required: true, message: '请选择婚姻状况' }]}
          >
            <Select placeholder="请选择婚姻状况">
              <Option value="single">未婚</Option>
              <Option value="married">已婚</Option>
              <Option value="divorced">离异</Option>
              <Option value="widowed">丧偶</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="religion"
            label="宗教信仰"
          >
            <Select placeholder="请选择宗教信仰" allowClear>
              <Option value="none">无</Option>
              <Option value="buddhism">佛教</Option>
              <Option value="christianity">基督教</Option>
              <Option value="islam">伊斯兰教</Option>
              <Option value="taoism">道教</Option>
              <Option value="catholicism">天主教</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="hometown"
            label="籍贯"
            rules={[{ required: true, message: '请输入籍贯' }]}
          >
            <Input placeholder="请输入籍贯(省/市/县)" />
          </Form.Item>

          <Form.Item
            name="registeredAddress"
            label="户籍地址"
            rules={[{ required: true, message: '请输入户籍地址' }]}
          >
            <Input placeholder="请输入详细户籍地址" />
          </Form.Item>

          <Form.Item
            name="birthday"
            label="生日"
            rules={[{ required: true, message: '请选择生日' }]}
          >
            <DatePicker 
              style={{ width: '100%' }}
              placeholder="请选择生日"
            />
          </Form.Item>

          <Form.Item
            name="ethnicity"
            label="民族"
            rules={[{ required: true, message: '请输入民族' }]}
          >
            <Input placeholder="请输入民族" />
          </Form.Item>

          <Form.Item
            name="gender"
            label="性别"
            rules={[{ required: true, message: '请选择性别' }]}
          >
            <Select placeholder="请选择性别">
              <Option value="male">男</Option>
              <Option value="female">女</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="zodiac"
            label="生肖"
          >
            <Select placeholder="请选择生肖" allowClear>
              <Option value="rat">鼠</Option>
              <Option value="ox">牛</Option>
              <Option value="tiger">虎</Option>
              <Option value="rabbit">兔</Option>
              <Option value="dragon">龙</Option>
              <Option value="snake">蛇</Option>
              <Option value="horse">马</Option>
              <Option value="goat">羊</Option>
              <Option value="monkey">猴</Option>
              <Option value="rooster">鸡</Option>
              <Option value="dog">狗</Option>
              <Option value="pig">猪</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="constellation"
            label="星座"
          >
            <Select placeholder="请选择星座" allowClear>
              <Option value="aries">白羊座</Option>
              <Option value="taurus">金牛座</Option>
              <Option value="gemini">双子座</Option>
              <Option value="cancer">巨蟹座</Option>
              <Option value="leo">狮子座</Option>
              <Option value="virgo">处女座</Option>
              <Option value="libra">天秤座</Option>
              <Option value="scorpio">天蝎座</Option>
              <Option value="sagittarius">射手座</Option>
              <Option value="capricorn">摩羯座</Option>
              <Option value="aquarius">水瓶座</Option>
              <Option value="pisces">双鱼座</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="phone"
            label="手机号"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
            ]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item
            name="idCard"
            label="身份证号"
            rules={[
              { required: true, message: '请输入身份证号' },
              { pattern: /^\d{17}[\dXx]$/, message: '身份证号格式不正确' }
            ]}
          >
            <Input placeholder="请输入身份证号" />
          </Form.Item>

          <Form.Item label="身份证照片" required>
            <Form.Item
              name="idCardFront"
              valuePropName="fileList"
              rules={[{ required: true, message: '请上传身份证正面' }]}
              noStyle
            >
              <Upload.Dragger
                name="front"
                action="/api/worker/upload-photo"
              headers={{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'X-Requested-With': null // 避免默认的XHR请求头
              }}
              data={{
                workerId: form.getFieldValue('id') || 'new'
              }}
                listType="picture"
                maxCount={1}
                beforeUpload={(file) => {
                  const isLt5M = file.size / 1024 / 1024 < 5;
                  if (!isLt5M) {
                    message.error('图片大小不能超过5MB');
                  }
                  return isLt5M;
                }}
                accept="image/*"
              >
                <p className="ant-upload-text">点击或拖拽上传身份证正面</p>
                <p className="ant-upload-hint">支持JPG/PNG格式，不超过5MB</p>
              </Upload.Dragger>
            </Form.Item>

            <Form.Item
              name="idCardBack"
              valuePropName="fileList"
              rules={[{ required: true, message: '请上传身份证反面' }]}
              style={{ marginTop: 16 }}
              noStyle
            >
              <Upload.Dragger
                name="back"
                customRequest={({ file, onSuccess }) => {
                setTimeout(() => {
                  onSuccess("ok", file);
                }, 0);
              }}
                listType="picture"
                maxCount={1}
                beforeUpload={(file) => {
                  const isLt5M = file.size / 1024 / 1024 < 5;
                  if (!isLt5M) {
                    message.error('图片大小不能超过5MB');
                  }
                  return isLt5M;
                }}
                accept="image/*"
              >
                <p className="ant-upload-text">点击或拖拽上传身份证反面</p>
                <p className="ant-upload-hint">支持JPG/PNG格式，不超过5MB</p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>

          <Form.Item
            name="type"
            label="工种"
            rules={[{ required: true, message: '请选择工种' }]}
          >
            <Select placeholder="请选择工种">
              <Option value="nanny">月嫂</Option>
              <Option value="live_in_babysitter">住家育儿嫂</Option>
              <Option value="cleaning">保洁</Option>
              <Option value="live_in_housekeeper">住家保姆</Option>
              <Option value="pet_care">养宠</Option>
              <Option value="hourly_worker">小时工</Option>
              <Option value="daytime_babysitter">白班育儿</Option>
              <Option value="daytime_housekeeper">白班保姆</Option>
            </Select>
          </Form.Item>

          <Form.List name="workExperiences">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} style={{ marginBottom: 16 }}>
                    <Form.Item
                      {...restField}
                      name={[name, 'period']}
                      label="工作时间"
                      rules={[{ required: true, message: '请选择工作时间' }]}
                    >
                      <DatePicker.RangePicker 
                        picker="month" 
                        style={{ width: '100%' }}
                        format="YYYY年MM月"
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'description']}
                      label="工作内容"
                      rules={[{ required: true, message: '请输入工作内容' }]}
                    >
                      <TextArea rows={4} placeholder="详细描述工作职责和成就" />
                    </Form.Item>
                    <Button 
                      type="dashed" 
                      onClick={() => remove(name)}
                      style={{ marginBottom: 16 }}
                    >
                      删除此段经历
                    </Button>
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    添加工作经历
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          {/* 体检报告上传 */}
          <Form.Item label="体检报告" style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <Form.Item
                name="medicalReports"
                valuePropName="fileList"
                getValueFromEvent={(e) => e?.fileList || []}
                style={{ flex: 1 }}
              >
                <Upload
                  listType="picture-card"
                  multiple
                  maxCount={5}
                  accept=".pdf,.jpg,.jpeg,.png"
                  customRequest={({ file, onSuccess }) => {
                    setTimeout(() => onSuccess("ok", file), 0);
                  }}
                  beforeUpload={(file) => {
                    const isValidType = ['application/pdf', 'image/jpeg', 'image/png'].includes(file.type);
                    const isValidSize = file.size / 1024 / 1024 < 10;
                    
                    if (!isValidType) {
                      message.error('只支持PDF/JPG/PNG格式');
                      return Upload.LIST_IGNORE;
                    }
                    if (!isValidSize) {
                      message.error('文件大小不能超过10MB');
                      return Upload.LIST_IGNORE;
                    }
                    return true;
                  }}
                  onPreview={(file) => {
                    if (file.type === 'application/pdf') {
                      window.open(URL.createObjectURL(file.originFileObj));
                    } else {
                      setPreviewImage(file.url || file.preview);
                      setPreviewOpen(true);
                    }
                  }}
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>上传报告</div>
                  </div>
                </Upload>
              </Form.Item>
              
              <Form.Item
                name="medicalCheckDate"
                label="体检时间"
                style={{ width: 200 }}
              >
                <DatePicker 
                  style={{ width: '100%' }}
                  format="YYYY年MM月DD日" 
                />
              </Form.Item>
            </div>
            <div style={{ color: 'rgba(0,0,0,0.45)', fontSize: 12, marginTop: 8 }}>
              最多上传5份报告，每份不超过10MB，支持PDF/JPG/PNG格式
            </div>
          </Form.Item>

          <Form.Item
            name="photos"
            label="个人照片"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e?.fileList;
            }}
            extra="最多上传10张，每张不超过5MB，支持JPG/PNG格式"
            rules={[{ required: true, message: '请上传至少1张个人照片' }]}
          >
            <Upload
              customRequest={({ file, onSuccess }) => {
                setTimeout(() => {
                  onSuccess("ok", file);
                }, 0);
              }}
              listType="picture-card"
              multiple
              maxCount={10}
              beforeUpload={(file) => {
                return new Promise((resolve, reject) => {
                  const isImage = ['image/jpeg', 'image/png'].includes(file.type);
                  const isLt5M = file.size / 1024 / 1024 < 5;
                  
                  if (!isImage) {
                    message.error('只能上传JPG/PNG格式图片');
                    return reject(false);
                  }
                  if (!isLt5M) {
                    message.error('图片大小不能超过5MB');
                    return reject(false);
                  }

                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const img = new Image();
                    img.onload = () => {
                      const canvas = document.createElement('canvas');
                      const ctx = canvas.getContext('2d');
                      const MAX_SIZE = 800;
                      let width = img.width;
                      let height = img.height;
                      
                      if (width > height) {
                        if (width > MAX_SIZE) {
                          height *= MAX_SIZE / width;
                          width = MAX_SIZE;
                        }
                      } else {
                        if (height > MAX_SIZE) {
                          width *= MAX_SIZE / height;
                          height = MAX_SIZE;
                        }
                      }
                      
                      canvas.width = width;
                      canvas.height = height;
                      ctx.drawImage(img, 0, 0, width, height);
                      ctx.canvas.toBlob(
                        (blob) => {
                          resolve(new File([blob], file.name, { type: 'image/jpeg' }));
                        },
                        'image/jpeg',
                        0.7
                      );
                    };
                    img.src = event.target.result;
                  };
                  reader.readAsDataURL(file);
                });
              }}
              onPreview={handlePreview}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传照片</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item
            name="certificates"
            label="技能证书"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e?.fileList;
            }}
            extra="最多上传10张证书，每张不超过5MB，支持JPG/PNG格式"
          >
            <Upload
              customRequest={({ file, onSuccess }) => {
                setTimeout(() => {
                  onSuccess("ok", file);
                }, 0);
              }}
              listType="picture-card"
              multiple
              maxCount={10}
              beforeUpload={(file) => {
                return new Promise((resolve, reject) => {
                  const isImage = ['image/jpeg', 'image/png'].includes(file.type);
                  const isLt5M = file.size / 1024 / 1024 < 5;
                  
                  if (!isImage) {
                    message.error('只能上传JPG/PNG格式图片');
                    return reject(false);
                  }
                  if (!isLt5M) {
                    message.error('证书大小不能超过5MB');
                    return reject(false);
                  }

                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const img = new Image();
                    img.onload = () => {
                      const canvas = document.createElement('canvas');
                      const ctx = canvas.getContext('2d');
                      const MAX_SIZE = 800;
                      let width = img.width;
                      let height = img.height;
                      
                      if (width > height) {
                        if (width > MAX_SIZE) {
                          height *= MAX_SIZE / width;
                          width = MAX_SIZE;
                        }
                      } else {
                        if (height > MAX_SIZE) {
                          width *= MAX_SIZE / height;
                          height = MAX_SIZE;
                        }
                      }
                      
                      canvas.width = width;
                      canvas.height = height;
                      ctx.drawImage(img, 0, 0, width, height);
                      ctx.canvas.toBlob(
                        (blob) => {
                          resolve(new File([blob], file.name, { type: 'image/jpeg' }));
                        },
                        'image/jpeg',
                        0.7
                      );
                    };
                    img.src = event.target.result;
                  };
                  reader.readAsDataURL(file);
                });
              }}
              onPreview={handlePreview}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传证书</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </Card>
    </ConfigProvider>
  );
}