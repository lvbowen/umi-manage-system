export default [
  { path: '/Login', exact: true, component: '@/pages/Login', title: '登录' },
  {
    path: '/',
    component: '@/layouts/index',
    wrappers: ['@/layouts/Auth'],
    routes: [
      { path: '/', redirect: '/PlanBiDao', exact: true },
      { path: '*', component: '@/pages/NotFound', title: '404' },
    ],
  },
  { path: '*', component: '@/pages/NotFound', title: '404' },
];
