cd /var/app
sudo pm2 stop --interpreter babel-node server/server.js 
sudo npm install babel-cli sharp webpack nodemon
sudo npm install
sudo webpack
cd customerupload
sudo yarn
sudo yarn build
cd ../../..
sudo pm2 start --interpreter babel-node server/server.js
