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
  hashMethod:     "md5", //optional "md5" or "sha1" default is "md5"
  //other ssh2.connect options
  algorithms: {
    kex: [
        'diffie-hellman-group1-sha1',
        'ecdh-sha2-nistp256',
        'ecdh-sha2-nistp384',
        'ecdh-sha2-nistp521',
        'diffie-hellman-group-exchange-sha256',
        'diffie-hellman-group14-sha1'],
    cipher: [
        'aes128-ctr',
        'aes192-ctr',
        'aes256-ctr',
        'aes128-gcm',
        'aes128-gcm@openssh.com',
        'aes256-gcm',
        'aes256-gcm@openssh.com',
        'aes256-cbc'
    ]
  },
  commands:      [
            "terminal length 0",
            "show version",
            "show ssh",
            "show log"
        ],
        msg: {
            send: function( message ) {
                console.log("message: " + message);
            }
        },
    verbose: true,
    debug:               true,
    idleTimeOut:         15000,
    connectedMessage:    "connected",
    readyMessage:        "ready",
    closedMessage:       "closed",

    onCommandComplete: function( command, response, sshObj ) {

        console.log("------------- onCommandComplete ---------");
        console.log(command + ": " + response);
    },
    onEnd: function( sessionText, sshObj ) {
        console.log("--------- onEnd has ------------");
        console.log(sessionText);
    }

});
}
}





var host = {
    server:        {  
            host:           "<host IP>",
            port:           "22",
            userName:       "<username>",
            password:       "<password>",
            hashMethod:     "md5", //optional "md5" or "sha1" default is "md5"
            //other ssh2.connect options
            algorithms: {
                kex: [
                    'diffie-hellman-group1-sha1',
                    'ecdh-sha2-nistp256',
                    'ecdh-sha2-nistp384',
                    'ecdh-sha2-nistp521',
                    'diffie-hellman-group-exchange-sha256',
                    'diffie-hellman-group14-sha1'],
                cipher: [
                    'aes128-ctr',
                    'aes192-ctr',
                    'aes256-ctr',
                    'aes128-gcm',
                    'aes128-gcm@openssh.com',
                    'aes256-gcm',
                    'aes256-gcm@openssh.com',
                    'aes256-cbc'
                ]
            }

        },
        connection:         require ('ssh2'),
        commands:      [
            "terminal length 0",
            "show version",
            "show ssh",
            "show log"
        ],
        msg: {
            send: function( message ) {
                console.log("message: " + message);
            }
        },
    verbose: true,
    debug:               true,
    idleTimeOut:         15000,
    connectedMessage:    "connected",
    readyMessage:        "ready",
    closedMessage:       "closed",

    onCommandComplete: function( command, response, sshObj ) {

        console.log("------------- onCommandComplete ---------");
        console.log(command + ": " + response);
    },
    onEnd: function( sessionText, sshObj ) {
        console.log("--------- onEnd has ------------");
        console.log(sessionText);
    }
};



//Create a new instance 
var SSH2Shell = require ('ssh2shell-ssh2.connect-options'),
    SSH       = new SSH2Shell(host);

//Start the process 
SSH.connect();
