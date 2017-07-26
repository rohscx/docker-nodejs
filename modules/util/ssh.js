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
    password: this.password
    )
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
