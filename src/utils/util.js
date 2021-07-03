/**
 * 获取 localStorage tabList
 * @returns
 */
export const getStorageTabList = () => {
  const tabs = localStorage.tabList;
  if (tabs) {
    return JSON.parse(tabs);
  }
  return null;
};
