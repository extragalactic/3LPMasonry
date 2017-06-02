cd /var/app
sudo pm2 stop --interpreter babel-node server/server.js
sudo rm -rf node_modules
sudo yarn install babel-cli sharp webpack nodemon canvas --ignore-engines
sudo yarn --ignore-engines
sudo webpack
cd customerupload
sudo yarn
sudo yarn build
cd ..
sudo pm2 start --interpreter babel-node server/server.js
