/**
 * 运行时配置， 执行顺序：render > patchRoutes > getInitialState
 */
import router from '@/router';
import './global.less';

// export function render(oldRender) {
// 如果从服务端获取路由，可以在这里请求接口
// fetch('/api/routes').then(res=>res.json()).then((res) => {
//   extraRoutes = res.routes;
// oldRender();
// })
// }

/**
 * 动态修改路由
 * @param {routes} 构建配置里的 routes 属性
 */
export function patchRoutes({ routes }) {
  routes[1].routes.unshift(...router);
}

/**
 * 初始化全局数据，通过 useModel('@@initialState') 消费数据
 * @returns
 */
export async function getInitialState() {
  // const data = await fetch();
  return {
    userInfo: 'aaa',
  };
}

// TODO 初始化 tabList, 暂时放着这，开发登录页之后应放在登录成功逻辑后
function initTabList() {
  const tabList = localStorage.tabList;
  if (!tabList) {
    localStorage.tabList = JSON.stringify([router[0]]);
  }
  return localStorage.tabList;
}
initTabList();
