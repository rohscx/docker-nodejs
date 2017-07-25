var SSH = require('simple-ssh');

module.exports = class ssh {
  constructor (username,password,host){
    this.host = host;
    this.username = username;
    this.password = password;
    this.port = 22;
  }

  makeCon(){
    var Client = require('ssh2').Client;

var conn = new Client();
conn.on('ready', function() {
  console.log('Client :: ready');
  conn.forwardOut('192.168.100.102', 8000, '127.0.0.1', 80, function(err, stream) {
    if (err) throw err;
    stream.on('close', function() {
      console.log('TCP :: CLOSED');
      conn.end();
    }).on('data', function(data) {
      console.log('TCP :: DATA: ' + data);
    }).end([
      'HEAD / HTTP/1.1',
      'User-Agent: curl/7.27.0',
      'Host: 127.0.0.1',
      'Accept: */*',
      'Connection: close',
      '',
      ''
    ].join('\r\n'));
  });
}).connect({
  host: this.host,
  port: this.port,
  username: this.username,
  password: this.password,
  algorithms: {
    algorithms: {
    serverHostKey: ['aes128-ctr',
'aes192-ctr',
'aes256-ctr',
'aes128-gcm',
'aes128-gcm@openssh.com',
'aes256-gcm',
'aes256-gcm@openssh.com',
'aes256-cbc',
'aes192-cbc',
'aes128-cbc',
'blowfish-cbc',
'3des-cbc',
'arcfour256',
'arcfour128',
'cast128-cbc',
'arcfour']
  }
}
});
}
}
