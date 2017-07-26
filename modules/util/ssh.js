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
    }
}


var Expectly = require('expectly').Expectly;
var Patterns = require('expectly').Patterns;
 
var settings = {
    host: 'switch1',
    port: 22,
    protocol: 'ssh',
    username: 'cisco',
    password: 'cisco',
    autoEnable: true,
    enablePassword: 'cisco'
}
 
// These regexs are used to grab the content between the begin and start of a config.
var START_CONFIG = Patterns['RANGE START RUNNING-CONFIG'];
var END_CONFIG = Patterns['RANGE STOP RUNNING-CONFIG'];
 
 
var expectly = new Expectly(settings);
 
// Show errors...
expectly.on('error', function(err){
    console.log('Error', err)
});
 
expectly.on('ready', function(session){
 
    // At this point you should be logged in. The session object is an expectly-stream session.
 
    // Here we execute a 'show run' command to see 
 
    session.sync()
        .send("show run\n")
        .between(BEGIN_CONFIG, END_CONFIG, function(err, results, done) {
            // Store the configuration in the sessions config variable.
            session.set('config', results);
            done();
        })
        .end(function(err){
            // Get the configuration from the sessions config variable	
            var deviceConfig = session.get('config');
            console.log(deviceConfig);
            expectly.end();
    })
})
 
expectly.connect();
