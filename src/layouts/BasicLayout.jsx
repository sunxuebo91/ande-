
import { Layout, Menu } from 'antd';
import { UserOutlined, TeamOutlined, FileTextOutlined } from '@ant-design/icons';
import { Routes, Route } from 'react-router-dom';
import ResumeList from '../pages/Worker/List.jsx';
import Create from '../pages/Worker/Create.jsx';
import ResumeDetail from '../pages/Worker/Detail.jsx';

const { Sider } = Layout;

export default function BasicLayout() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={220} theme="light">
        <div style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <h2 style={{ margin: 0, color: '#1890ff' }}>安得家政CRM</h2>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ height: '100%', borderRight: 0 }}
          items={[
            {
              key: 'worker',
              icon: <UserOutlined />,
              label: '劳动者管理',
              children: [
                { key: 'worker-list', label: '简历列表' },
                { 
                  key: 'worker-create', 
                  label: '创建简历',
                  onClick: () => window.location.href = '/worker/create'
                }
              ]
            },
            {
              key: 'customer',
              icon: <TeamOutlined />,
              label: '客户管理',
              children: [
                { key: 'customer-list', label: '客户列表' },
                { key: 'customer-create', label: '创建客户' }
              ]
            },
            {
              key: 'order',
              icon: <FileTextOutlined />,
              label: '订单管理',
              children: [
                { key: 'order-list', label: '订单列表' },
                { key: 'order-create', label: '创建订单' }
              ]
            }
          ]}
        />
      </Sider>
      <Layout>
        <div style={{ padding: 24, minHeight: 360 }}>
          <Routes>
            <Route path="/worker/list" element={<ResumeList />} />
            <Route path="/worker/create" element={<Create />} />
            <Route path="/worker/detail/:id" element={<ResumeDetail />} />
            {/* 其他路由... */}
          </Routes>
        </div>
      </Layout>
    </Layout>
  );
}
