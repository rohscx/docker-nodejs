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
        password: this.password
    })
    .then(() => {
        return ssh.exec('uptime');
    })
    .then(function (result) {
        console.log(result);
    }
    .then(() => {
        return ssh.exec('whoami')
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
