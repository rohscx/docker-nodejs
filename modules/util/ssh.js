var SSH = require('simple-ssh');

module.exports = class ssh {
  constructor (username,password,host){
    this.host = host;
    this.username = username;
    this.password = password;
  }

  makeCon(){
    let sshCon = new SSH({
        host: this.host,
        user: this.username,
        pass: this.password
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
}
