/***
 *  构建时配置
 */

import { defineConfig } from 'umi';
import routes from './routes.js';
import proxy from './proxy';
const packageJson = require('../package.json');

const getPublishPath = (basename) => {
  let publish;
  if (/\/$/.test(basename)) {
    publish = basename;
  } else {
    publish = `${basename}/`;
  }
  return process.env.NODE_ENV === 'development' ? '/' : publish;
};

const getBasename = () => {
  return process.env.NODE_ENV === 'development'
    ? '/'
    : packageJson.basename || '/';
};
const basename = getBasename();
const publishPath = getPublishPath(basename);

export default defineConfig({
  title: '碧道工程建设管理',
  dva: false,
  layout: false,
  base: basename,
  locale: {
    default: 'zh-CN',
    antd: true,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  request: false,
  nodeModulesTransform: {
    type: 'none',
  },
  publicPath: publishPath,
  routes,
  proxy,
  alias: {
    assets: '@/assets',
    layouts: '@/layouts',
    components: '@/components',
    pages: '@/pages',
    utils: '@/utils',
    service: '@/service',
  },
  dynamicImport: {
    loading: '@/components/Loading',
  },
  devtool: 'eval-cheap-module-source-map',
  outputPath: 'build',
  fastRefresh: {},
  webpack5: {},
});
