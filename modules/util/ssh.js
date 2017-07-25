const SSH2Shell = require ('ssh2shell');

module.exports = class ssh {
  constructor (username,password,host){
    this.host = host;
    this.username = username;
    this.password = password;
    this.port = 22;
  }
/*
  makeCon(){
    let host = {
        server:        {
          host: this.host,
          port: this.port,
          userName: this.username,
          password: this.password,
          hashMethod: "md5", //optional "md5" or "sha1" default is "md5"
          //other ssh2.connect options
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
              'aes256-cbc'
          ]
          }
            },
            connection:         require ('ssh2'),
            commands:      [
                "terminal length 0",
                "show version",
                "show ssh",
                "show log"
            ],
            msg: {
                send: function( message ) {
                    console.log("message: " + message);
                }
            },
        verbose: true,
        debug:               true,
        idleTimeOut:         5000,
        connectedMessage:    "connected",
        readyMessage:        "ready",
        closedMessage:       "closed",

        onCommandComplete: function( command, response, sshObj ) {

            console.log("------------- onCommandComplete ---------");
            console.log(command + ": " + response);
        },
        onEnd: function( sessionText, sshObj ) {
            console.log("--------- onEnd has ------------");
            console.log(sessionText);
        }
    };



    //Create a new instance

        let SSH = new SSH2Shell(host);

    //Start the process
    SSH.connect();
  }
}
*/

  makeCon(){
    var host = {
     server:        {
      host: this.host,
      userName: this.username,
      password: this.password,
      hashMethod: "md5", //optional "md5" or "sha1" default is "md5"
      //other ssh2.connect options
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
          'aes256-cbc'
      ]
      },
     },
     commands:      [ "exit","exit","exit" ],
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
      },
      onCommandProcessing: function( command, response, sshObj, stream ){

if ( response.indexOf("Connecte") != -1 ){

  stream.write("\n");
}

}

      //Create a new instance passing in the host object
      let SSH = new SSH2Shell(host),
      //Use a callback function to process the full session text
      callback = function(sessionText){
        console.log(sessionText)
      }

    //Start the process
    SSH.connect(callback);
  }


//host configuration with connection settings and commands
}
