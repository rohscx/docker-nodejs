const SSH2Shell = require ('ssh2shell')

module.exports = class ssh {
  constructor (username,password,host){
    this.host = host;
    this.username = username;
    this.password = password;
    this.port = 22;
  }

  makeCon(){
    let host = {
     server: {
        host: this.host,
        port: "22",
        userName: this.username,
        password: this.password,
        hashMethod:     "md5",
        readyTimeout: 50000,
        tryKeyboard: true,
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
        commands: [
           "show deviceport global",
           "show deviceport names" ],
        msg: {
           send: function( message ) {
              console.log("message: " + message);
           }
        },
        verbose: true,
        debug: true,
        idleTimeOut: 10000,
        onEnd: function( sessionText, sshObj ) {
           sshObj.msg.send("--------- onEnd has ------------");
           sshObj.msg.send(sessionText);
        }

  };

  //Create a new instance
  let SSH = new SSH2Shell(host);
  //Start the process
  SSH.connect();
  }
}
