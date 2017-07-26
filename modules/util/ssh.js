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
    let testData = 
        `conf t 
          access-list 99 permit 10.16.2.96`;
 let ssh = new node_ssh()
ssh.connect({
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
})
.then(function() {
  // Command 
  ssh.execCommand("show flash:").then(function(result) {
    let outPut = [result.stdout];
    outPut[0] = outPut.replace(/\n$/, '');
    console.log('STDOUT: ' + outPut)
    console.log('STDERR: ' + result.stderr)
  
  })
})

  }

}
