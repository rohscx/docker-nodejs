const SSH2Shell = require ('ssh2shell')
const SSH = require('simple-ssh');

module.exports = class ssh {
  constructor (username,password,host){
    this.host = host;
    this.username = username;
    this.password = password;
    this.port = 22;
  }

  makeCon(){
    const SSH2Shell = require ('ssh2shell')

module.exports = class ssh {
  constructor (username,password,host){
    this.host = host;
    this.username = username;
    this.password = password;
    this.port = 22;
  }

  makeCon(){
   var ssh = new SSH({
    host: this.host,
    user: this.username,
    pass: this.password
});
 
ssh.exec('echo $PATH', {
    out: function(stdout) {
        console.log(stdout);
    }
}).start();
 
/*** Using the `args` options instead ***/
ssh.exec('echo', {
    args: ['$PATH'],
    out: function(stdout) {
        console.log(stdout);
    }
}).start();
}

}
