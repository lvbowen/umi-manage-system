/**
 * 页面路由
 */
import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons';
import PlanBiDao from 'pages/PlanBiDao';
import ConstructingBiDao from 'pages/ConstructingBiDao';

const routes = [
  {
    path: '/PlanBiDao',
    exact: true,
    component: PlanBiDao,
    title: '规划碧道',
    icon: <DesktopOutlined />,
    key: '1',
  },
  {
    path: '/ConstructingBiDao',
    exact: true,
    component: ConstructingBiDao,
    title: '在建碧道',
    icon: <PieChartOutlined />,
    key: '2',
  },
  // {
  //   title: '父菜单',
  //   icon: <PieChartOutlined />,
  //   key: 'sub1',
  //   children: [
  //     {
  //       path: '/ConstructingBiDao2',
  //       exact: true,
  //       component: ConstructingBiDao,
  //       title: '在建碧道2',
  //       key: '4',
  //     },
  //   ],
  // },
];

export default routes;
