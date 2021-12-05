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
  // 拆包，chunks 和 splitChunks 要同时设置
   chunks: [
    'chunk-vendors',
    'echarts',
    'draft',
    'pdf',
    // 'yl-smart-and-visual-sdk',
    'umi',
  ],
  chainWebpack: function (config, { webpack }) {
    config.merge({
      optimization: {
        minimize: false,
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          minChunks: 1,
          automaticNameDelimiter: '.',
          // 上面是全局属性，下面是单个属性，单个的属性优化级高于上面（相同属性的话）
          cacheGroups: {
            styles: {
              name: 'styles',
              test: /\.(css|less)$/,
              chunks: 'async',
              minChunks: 1,
              minSize: 0,
            },
            vendors: {
              name: `chunk-vendors`,
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
            },
            echarts: {
              name: 'echarts',
              priority: 0,
              test: /[\\/]node_modules[\\/](echarts)[\\/]/,
            },
            draft: {
              name: 'draft',
              priority: 10,
              test: /[\\/]node_modules[\\/](draft-js|react-draft-wysiwyg|draftjs-to-html|draftjs-to-markdown|html-to-draftjs)[\\/]/,
            },
            pdf: {
              name: 'pdf',
              priority: 20,
              test: /[\\/]node_modules[\\/](react-pdf-js|@bundled-es-modules)[\\/]/,
            },
            // 'yl-smart-and-visual-sdk': {
            //   name: 'yl-smart-and-visual-sdk',
            //   priority: 30,
            //   test: /[\\/]node_modules[\\/](yunli-smart-fe-ui|yl-visual-sdk)[\\/]/,
            // },
            //   async: {
            //     chunks: 'async',
            //     minChunks: 2,
            //     name: 'async',
            //     maxInitialRequests: 1,
            //     minSize: 0,
            //     priority: 5,
            //     reuseExistingChunk: true,
            //   },
          },
        },
      },
    });
  },
  devtool: 'eval-cheap-module-source-map',
  outputPath: 'build',
  fastRefresh: {},
  webpack5: {},
});
