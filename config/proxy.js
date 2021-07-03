const MOCK_IP = 'http://47.92.195.145:38080/app/mock/47';
const hostIp = 'http://1.2.3.4:80';

const proxy = {};

function addProxy(key, target, pathRewrite = {}) {
  proxy[key] = {
    target,
    changeOrigin: true,
    pathRewrite,
  };
}

addProxy('/rap2/mock/**', MOCK_IP);
// addProxy('/gisUrl/**', GIS_IP, {
//     '/gisUrl': ''
// });
addProxy('/api/**', hostIp);
// addProxy('/gis/**', GIS_IP);
addProxy('/auth/*', hostIp);
addProxy('/oss/**', hostIp);

export default proxy;
