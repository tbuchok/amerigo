var ssh = require('ssh-client')
  , restify = require('restify')
  , host = process.env.SSH_HOST || process.env.npm_package_config_ssh_host
  , username = process.env.SSH_USERNAME || process.env.npm_package_config_ssh_username;


var server = restify.createServer();
server.name = 'Amerigo';

var handlePwd = function(req, res) {
  var client = ssh(username, host, function() { 
    client.exec('pwd', function(err, out) {
      res.end('pwd: ' + out);
      client.close();
    });
  });
}

server.get('/pwd', handlePwd);

server.listen(3000, function() {
  console.log('%s lstening at %s', server.name, server.url)
});