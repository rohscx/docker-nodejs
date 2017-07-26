const fs = require('fs')
const path = require('path')
const node_ssh = require('node-ssh')
 const SshShell = require('ssh-shell')
 const ToSSH = require('to-ssh');


module.exports = class ssh {
  constructor (username,password,host){
    this.host = host;
    this.username = username;
    this.password = password;
    this.port = 22;
  }

  makeCon(){
   var ssh = new ToSSH({
    host: this.host,
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
           }
});
   ssh.connect(function(error) {
    if(!error) {
        console.log("Connected!"); // -> "Connected!"
    }
});
   ssh.addTask('whoami', function(stdout, stderr) {
    if(!stderr) {
        console.log(stdout); // -> "root"
    }
});
   ssh.disconnect()
  }

}
