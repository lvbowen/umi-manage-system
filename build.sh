echo "##### build start =="

echo "##### npm install yarn"
#sudo npm install -g yarn

npm config set registry 'http://registry.npm.taobao.org'
npm config set sass-binary-site 'http://npm.taobao.org/mirrors/node-sass'
npm install 

echo "##### npm build"
npm run build

mkdir target
cp docker/* target/
mv build target/
