const fs = require('fs')
const path = require('path')
const node_ssh = require('node-ssh')
 const SshShell = require('ssh-shell')
 const ToSSH = require('to-ssh');
var Client = require('s9s-ssh');
       const Connection = require('ssh.js').Connection;

module.exports = class ssh {
  constructor (username,password,host){
    this.host = host;
    this.username = username;
    this.password = password;
    this.port = 22;
  }

  makeCon(){

 
const options = {
   host: this.host,
   username: this.username,
   password: this.password
};
 
let connection = new Connection(options);
 
try {
 
   await connection.open();
   console.log('Connection opened!');
 
   let whoami = await connection.execute('show access-list 99');
   console.log('whoami = ' + whoami);
 
} catch (error) {
   console.log('An error occured!');
   console.log(error);
 
} finally {
   connection.close();
   console.log('Connection closed!');
}
  }

}
