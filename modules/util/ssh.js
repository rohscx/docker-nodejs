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
        idleTimeOut: 10000

  };
  host.standardPrompt =   ">$%#";
  //Create a new instance
  let SSH = new SSH2Shell(host);
  SSH.on ('commandTimeout',function( command, response, stream, connection ){
  if(sshObj.debug){this.emit("msg", this.sshObj.server.host + ": instance.onCommandTimeout");}
  //first test should only pass once to stop a response loop 
  if (command === "atp-get install node" 
     && response.indexOf("[Y/n]?") != -1 
     && this.sshObj.nodePrompt != true) {
    this.sshObj.nodePrompt = true;
    stream.write('y\n');
    return true;
  }
  this.sshObj.sessionText += response;
  this.emit("error", this.sshObj.server.host + ": Command `" + command + "` timed out after " 
    + (this._idleTime / 1000) + " seconds. command: " + command, "Command Timeout", true);
});
 
SSH.on ('end', function( sessionText, sshObj ) {
  //show the full session output. This could be emailed or saved to a log file. 
  if(sshObj.debug){this.emit("msg", this.sshObj.server.host + ": instance.onEnd");}
  this.emit("msg","\nSession text for " + sshObj.server.host + ":\n" + sessionText);
 });
  //Start the process
  SSH.connect();
  }
}
