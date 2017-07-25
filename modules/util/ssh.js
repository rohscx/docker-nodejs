var SSH = require('simple-ssh');

module.exports = class fileSystem {
  constructor (localHost,userName,passWord){
    this.localHost = localHost;
    this.userName = userName;
    this.passWord = passWord;
  }
  var ssh = new SSH({
      host: localHost,
      user: userName,
      pass: passWord
  });
   return new Promise((resolve, reject) =>{
     ssh.exec('echo $PATH', {
         out: function(stdout) {
             console.log(stdout);
         }
     }).start();
   })
}
