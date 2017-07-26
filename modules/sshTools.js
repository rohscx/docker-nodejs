const fs = require('fs');
const path = require('path');
const fileSystem = require('./util/ssh')
const securityFile = require('../securityFile')
//path.normalize(): example /opt/datafiles/about.html
//path.dirname();  example /opt/datafiles
//path.basename(); example about.html
//path.extname(); example .html



// Private Cisco ApicEM resource on the INTRAnet
const privateSsh = {
  "username": securityFile.private.sshUser.uName,
  "password": securityFile.private.sshUser.uPass,
  "host": securityFile.private.sshUser.host
};

const username = privateSsh.username ? privateSsh.username : "Please Set uName!!";
const password = privateSsh.password ? privateSsh.password : "Please Set uPass!!";
const host = privateSsh.host ? "localhost" : "localhost";


class sshTools extends ssh {
  constructor (username,password,host){
    super(username,password,host)
  }

  setHost(data){
    this.host = data;
  }

  setUname(data){
    this.username = data;
  }

  setUpass(data){
    this.password = data;
  }
  // Adds a Debugs for the contest of the Ticket POST HTTP request
  debug() {
    console.log("username: "+this.username,'\n',"password: "+this.password,'\n',"host: "+this.host,'\n')
  }
}

module.exports = new sshTools(username,password,host)
