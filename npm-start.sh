cd /var/app
sudo pm2 stop --interpreter babel-node server/server.js --watch
sudo npm install babel-cli sharp webpack nodemon
sudo npm install
sudo webpack
sudo pm2 start --interpreter babel-node server/server.js --watch

