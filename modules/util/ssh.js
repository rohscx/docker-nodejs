var SSH = require('simple-ssh');

module.exports = class ssh {
  constructor (host,userName,passWord){
    this.host = host;
    this.userName = userName;
    this.passWord = passWord;
  }
  let sshCon = new SSH({
      host: host,
      user: userName,
      pass: passWord
  });
   return new Promise((resolve, reject) =>{
     sshCon.exec('echo $PATH', {
         out: function(stdout) {
             console.log(stdout);
             if (stdout) {
               resolve(stdout);
             } else {
               reject(stdout);
             }
         }
     }).start();
   })
}
