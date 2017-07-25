var SSH = require('simple-ssh');

module.exports = class fileSystem {
  constructor (host,userName,passWord){
    this.host = host;
    this.userName = userName;
    this.passWord = passWord;
  }
  var ssh = new SSH({
      host: host,
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
