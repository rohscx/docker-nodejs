const fs = require('fs')
const path = require('path')
const node_ssh = require('node-ssh')
 const SshShell = require('ssh-shell')
 const ToSSH = require('to-ssh');
var Client = require('s9s-ssh');


module.exports = class ssh {
  constructor (username,password,host){
    this.host = host;
    this.username = username;
    this.password = password;
    this.port = 22;
  }

  makeCon(){
    var ssh = new Client();
   ssh
    .connect({
        host: this.host,
        port: 22,
        username: this.username,
        password: this.password,
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
              'aes256-cbc' ]
           },
    onCommandTimeout:    function( command, response, stream, connection ) {
     return true
    }
    })
    .then(() => {
        return ssh.exec('show access-list 99',{pty: true}, function(err, stream) {
        if (err) return callback(err);
        stream.on('close', function (code, signal) {
            callback(null, output);
        }).on('data', function (data) {
            output += data.toString();
        });
    })
    .then(function (result) {
        console.log(result);
    })
    .then(() => {
        return ssh.exec('show ip int GigabitEthernet0/1',{pty: true})
    })
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    })
    .finally(() => {
        ssh.end();
    });
  }

}
