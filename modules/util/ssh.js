const fs = require('fs')
const path = require('path')
const node_ssh = require('node-ssh')
 const SshShell = require('ssh-shell');


module.exports = class ssh {
  constructor (username,password,host){
    this.host = host;
    this.username = username;
    this.password = password;
    this.port = 22;
  }

  makeCon(){

 
const shell = new SshShell({
    username: this.username,
    password: this.password,
    host: this.host,
});
 
shell.set('NAME', 'show access-list 99');
shell.exec('echo Hello $NAME')
.then(result => {
    var {code, io} = result;
    if (code) {
        throw new Error('Exit code is ' + code);
    }
 
    console.log(io.toString()); // -> Hello World 
});
  }

}
