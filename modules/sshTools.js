const fs = require('fs');
const path = require('path');
const fileSystem = require('./util/fileSystem')
const securityFile = require('../securityFile')
const CiscoCli = require('./util/ciscoCli');
const Patterns = require('./util/ciscoCli');
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


let settings = {
    host: host,
    port: 22,
    protocol: 'ssh',
    username: username,
    password: password,
    autoEnable: false,
    enablePassword: 'cisco'
}

// These regexs are used to grab the content between the begin and start of a config.
let START_CONFIG = Patterns['RANGE START RUNNING-CONFIG'];
let END_CONFIG = Patterns['RANGE STOP RUNNING-CONFIG'];


let cliscocli = new CiscoCli(settings);

// Show errors...
cliscocli.on('error', function(err){
    console.log('Error', err)
});

cliscocli.on('ready', function(session){

    // At this point you should be logged in. The session object is an cliscocli-stream session.

    // Here we execute a 'show run' command to see

    session.sync()
        .send("show run\n")
        .between(BEGIN_CONFIG, END_CONFIG, function(err, results, done) {
            // Store the configuration in the sessions config letiable.
            session.set('config', results);
            done();
        })
        .end(function(err){
            // Get the configuration from the sessions config letiable
            let deviceConfig = session.get('config');
            console.log(deviceConfig);
            cliscocli.end();
    })
})

cliscocli.connect();
}

module.exports = new class sshTools {
  constructor (username,password,host){
  this.host = host;
  this.username = username;
  this.password = password;
  this.port = 22;
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

  makeCon(){

}
