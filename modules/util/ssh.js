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
        ["keyboard-interactive"]: function(name, instructions, instructionsLang, prompts, finish){
           console.log('Connection :: keyboard-interactive');
           console.log(prompts);
           finish(["<password>"]);
        },
        onEnd: function( sessionText, sshObj ) {
           sshObj.msg.send("--------- onEnd has ------------");
           sshObj.msg.send(sessionText);
        }

  };

  //Create a new instance
  let SSH = new SSH2Shell(host);
  SSH.on ('keyboard-interactive', function(name, instructions, instructionsLang, prompts, finish){
     if (this.sshObj.debug) {this.emit('msg', this.sshObj.server.host + ": Keyboard-interactive");}
     if (this.sshObj.verbose){
       this.emit('msg', "name: " + name);
       this.emit('msg', "instructions: " + instructions);
       var str = JSON.stringify(prompts, null, 4);
       this.emit('msg', "Prompts object: " + str);
       console.log("Cats on everything");
     }
     //The example presumes only the password is required 
     finish([this.sshObj.server.password] );
  });
  //Start the process
  SSH.connect();
  }
}
