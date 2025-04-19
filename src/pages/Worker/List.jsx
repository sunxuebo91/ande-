
import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Select, Table, Space, Spin } from 'antd';
import { SearchOutlined, SyncOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

export default function ResumeList() {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const fetchData = async () => {
    setLoading(true);
    try {
      console.log('正在请求工作者数据...');
      const response = await fetch('http://localhost:3001/api/workers');
      console.log('响应状态:', response.status);
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`数据加载失败: ${response.status} - ${errorData}`);
      }
      
      const result = await response.json();
      console.log('获取到的数据:', result);
      setData(result);
    } catch (error) {
      console.error('获取数据失败:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: '简历ID',
      dataIndex: '_id',
      key: '_id',
      fixed: 'left',
      width: 120,
      render: (id, record) => (
        <a onClick={() => navigate(`/worker/detail/${id}`, { 
          state: { 
            workerData: {
              ...record,
              id: record._id // 确保传递id字段
            } 
          } 
        })}>
          {id?.substring(0, 8)}
        </a>
      ),
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      width: 100,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 80,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: 120,
    },
    {
      title: '籍贯',
      dataIndex: 'hometown',
      key: 'hometown',
      width: 150,
    },
    {
      title: '工种',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (text) => {
        const typeMap = {
          'nanny': '月嫂',
          'live_in_babysitter': '住家育儿嫂',
          'cleaning': '保洁',
          'live_in_housekeeper': '住家保姆',
          'pet_care': '养宠',
          'hourly_worker': '小时工',
          'daytime_babysitter': '白班育儿',
          'daytime_housekeeper': '白班保姆'
        };
        return typeMap[text] || text;
      }
    },
    {
      title: '接单状态',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      width: 120,
      render: (text) => {
        const statusMap = {
          'accepting': '想接单',
          'not_accepting': '不接单',
          'on_duty': '已上户'
        };
        return statusMap[text] || text;
      }
    },
    {
      title: '期望薪资(元)',
      dataIndex: 'expectedSalary',
      key: 'expectedSalary',
      width: 120,
      render: (text) => text ? `${text}元` : '-'
    },
    {
      title: '工作经验(年)',
      dataIndex: 'workExperienceYears',
      key: 'workExperienceYears',
      width: 120,
      render: (text) => text ? `${text}年` : '-'
    },
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
      
      {loading ? (
        <Spin style={{ display: 'block', margin: '40px auto' }} />
      ) : data?.length > 0 ? (
        <Table
          style={{ marginTop: 16 }}
          columns={columns}
          dataSource={data}
          rowKey="_id"
          scroll={{ x: 1000 }}
        />
      ) : (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <img 
            src="/empty-state.svg" 
            alt="无数据" 
            style={{ width: 120, opacity: 0.6, marginBottom: 16 }}
          />
          <p style={{ color: 'rgba(0,0,0,0.45)' }}>暂无工作者数据</p>
          <Button 
            type="link" 
            onClick={() => fetchData()}
            style={{ marginTop: 8 }}
          >
            重新加载
          </Button>
        </div>
      )}
    </Card>
  );
}
