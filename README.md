# umi project

## Getting Started

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```

## 目录结构
  ```
  ├── config                   # umi 配置，包含路由，构建等配置
  ├── mock                     # 本地模拟数据
  ├── public
  │   └── favicon.png          # Favicon
  ├── src
  │   ├── assets               # 本地静态资源
  │   ├── components           # 业务通用组件
  │   ├── e2e                  # 集成测试用例
  │   ├── layouts              # 通用布局
  │   ├── models               # 全局 dva model
  │   ├── pages                # 业务页面入口和常用模板
  │   ├── services             # 后台接口服务
  │   ├── utils                # 工具库
  │   ├── locales              # 国际化资源
  │   ├── global.less          # 全局样式
  │   └── global.ts            # 全局 JS
  ├── tests                    # 测试工具
  ├── README.md
  └── package.json
  ```
  页面代码结构推荐:
  ```
  src
  ├── components
  └── pages
      ├── Welcome        // 路由组件下不应该再包含其他路由组件，基于这个约定就能清楚的区分路由组件和非路由组件了
      |   ├── components // 对于复杂的页面可以再自己做更深层次的组织，但建议不要超过三层
      |   ├── Form.tsx
      |   ├── index.tsx  // 页面组件的代码
      |   └── index.less // 页面样式
      ├── Order          // 路由组件下不应该再包含其他路由组件，基于这个约定就能清楚的区分路由组件和非路由组件了
      |   ├── index.tsx
      |   └── index.less
      ├── user           // 一系列页面推荐通过小写的单一字母做 group 目录
      |   ├── components // group 下公用的组件集合
      |   ├── Login      // group 下的页面 Login
      |   ├── Register   // group 下的页面 Register
      |   └── util.ts    // 这里可以有一些共用方法之类，不做推荐和约束，看业务场景自行做组织
      └── *              // 其它页面组件代码
  ```

## 其他约定
- 一个路由组件建一个 model 文件，该路由子组件也公用这个 model 文件；

## 效果图
![效果国](/layout.jpg)

## 其他
- react-loadable 设置成动态路由组件，同时 config.js 开启 dynamicImport 按需加载，这样每个页面就可以打包一个 js;

  └── package.json
