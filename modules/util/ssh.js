const fs = require('fs')
const path = require('path')
const node_ssh = require('node-ssh')


module.exports = class ssh {
  constructor (username,password,host){
    this.host = host;
    this.username = username;
    this.password = password;
    this.port = 22;
  }

  makeCon(){
    let testData = ["show flash:", "show access-lists 99"]
              var host = {
 server:        {     
  host:         this.host,
  userName:     this.username,
  password:     this.password,
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
 },
 commands:      [ "echo $(pwd)", "ls -l" ]
};
 
var SSH2Shell = require ('ssh2shell'),
  //Create a new instance passing in the host object 
  SSH = new SSH2Shell(host),
  //Use a callback function to process the full session text 
  callback = function(sessionText){
    console.log(sessionText)
  }
 
//Start the process 
SSH.connect(callback);
  }

}
