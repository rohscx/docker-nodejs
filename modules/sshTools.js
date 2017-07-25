const fs = require('fs');
const path = require('path');
const fileSystem = require('./util/ssh')
//path.normalize(): example /opt/datafiles/about.html
//path.dirname();  example /opt/datafiles
//path.basename(); example about.html
//path.extname(); example .html



// Private Cisco ApicEM resource on the INTRAnet
const privateApicEm = {
  "username": securityFile.private.sshUser.uName,
  "password": securityFile.private.sshUser.uPass,
  "host": securityFile.private.sshUser.localHost
};

const username = privateApicEm.username ? privateApicEm.username : "Please Set uName!!";
const password = privateApicEm.password ? privateApicEm.password : "Please Set uPass!!";
const host = privateApicEm.username ? "localhost" : "localhost";


class sshTools extends fileSystem {
  constructor (username,password,host){
    super(username,password,host)
  }

  setHost(data){
    this.host = data;
  }

  // Adds a Debugs for the contest of the Ticket POST HTTP request
  debug() {
    console.log("username: "+this.username,'\n',"password: "+this.password,'\n',"host: "+this.host,'\n')
  }
}

module.exports = new sshTools(username,password,host)
