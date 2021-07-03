/**
 * 1、model 文件在页面加载时和 model 里的 state 改变时会执行，组件中使用时 useModel('') 不会执行；
 * 2、model 可以使用其他 model
 */
import { useState, useCallback } from 'react';
import { history, useModel } from 'umi';
import routes from '@/router';
import { getStorageTabList } from 'utils/util';

export default function useLayoutModel() {
  const [collapsed, setCollapsed] = useState(false);
  const [tabList, setTabList] = useState(getStorageTabList() || [routes[0]]);

  // 登出
  const logout = () => {
    // TODO
  };

  const updateTabList = (arr = []) => {
    setTabList(arr);
    localStorage.tabList = JSON.stringify(arr);
  };

  // 新增 tab
  const changeTabList = (n, action) => {
    const tabs = getStorageTabList();
    if (tabs && tabs.length) {
      const isHas = tabs.some((i) => i.path === n.path);
      if (!isHas) {
        // 新增 tab
        tabs.push(n);
        updateTabList(tabs);
      }
    }
  };

  // 移除 tab
  const removeTabList = (path) => {
    const tabs = getStorageTabList();
    if (tabs && tabs.length) {
      const index = tabs.findIndex((i) => i.path === path);
      tabs.splice(index, 1);
      updateTabList(tabs);
      const curPath = history.location.pathname;
      if (curPath === path) {
        // 删除的正好是当前路由，则需要跳转到最右边的tab
        history.push(tabs[tabs.length - 1].path);
      }
    }
  };

  // 关闭所有tab
  const clearAllTabList = () => {
    const r = routes[0];
    history.push(r.path);
    updateTabList([r]);
  };

  return {
    collapsed,
    tabList,
    setCollapsed,
    logout,
    clearAllTabList,
    changeTabList,
    removeTabList,
  };
}
