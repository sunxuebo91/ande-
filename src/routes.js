
import BasicLayout from './layouts/BasicLayout.jsx';
import ResumeList from './pages/Worker/List.jsx';
import Create from './pages/Worker/Create.jsx';
import ResumeDetail from './pages/Worker/Detail.jsx';
import CustomerList from './pages/Customer/List.jsx';
import CustomerCreate from './pages/Customer/Create.jsx';
import CustomerDetail from './pages/Customer/Detail.jsx';
import OrderList from './pages/Order/List.jsx';
import OrderCreate from './pages/Order/Create.jsx';
import OrderDetail from './pages/Order/Detail.jsx';
import ResumePage from './pages/Resume/Resume.jsx';

const routes = [
  {
    path: '/',
    component: BasicLayout,
    routes: [
      {
        path: '/worker/list',
        component: ResumeList,
      },
      {
        path: '/worker/create',
        component: Create,
      },
      {
        path: '/worker/detail/:id',
        component: ResumeDetail,
      },
      {
        path: '/customer/list',
        component: CustomerList,
      },
      {
        path: '/customer/create',
        component: CustomerCreate,
      },
      {
        path: '/customer/detail/:id',
        component: CustomerDetail,
      },
      {
        path: '/order/list',
        component: OrderList,
      },
      {
        path: '/order/create',
        component: OrderCreate,
      },
      {
        path: '/order/detail/:id',
        component: OrderDetail,
      },
      {
        path: '/resume',
        component: ResumePage,
      },
      // 其他功能路由将在此添加
    ],
  },
];

export default routes;
