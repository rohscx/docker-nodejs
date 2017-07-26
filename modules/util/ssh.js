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
         onCommandComplete: function( command, response, sshObj ) {
  //confirm it is the root home dir and change to root's .ssh folder 
  if(sshObj.debug){
    this.emit("msg", this.sshObj.server.host + ": host.onCommandComplete event, command: " + command);
  }
  if (command === "show deviceport global") {
   //unshift will add the command as the next command, use push to add command as the last command 
   sshObj.commands.unshift("msg:The command and response check worked. Added another cd command.");
   sshObj.commands.unshift("cd .ssh");
  }
  //we are listing the dir so output it to the msg handler 
  else if (command === "show deviceport names"){      
   this.emit("msg", response);
  }
 },
 
 onEnd: function( sessionText, sshObj ) {
  //email the session text instead of outputting it to the console 
  if(sshObj.debug){this.emit("msg", this.sshObj.server.host + ": host.onEnd event");}
  
  this.emit("msg", "Sending session response email");
  
  // if callback is provided, errors will be passed into it 
  // else errors will be thrown 
 }
};
  //Create a new instance
  let SSH = new SSH2Shell(host);
  //Start the process
  SSH.connect();
  }
}
