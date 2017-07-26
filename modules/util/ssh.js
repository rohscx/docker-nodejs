const SSH2Shell = require ('ssh2shell');
const Expectly = require('expectly').Expectly;
const Patterns = require('expectly').Patterns;

module.exports = class ssh {
  constructor (username,password,host){
    this.host = host;
    this.username = username;
    this.password = password;
    this.port = 22;
  }

  makeCon(){
    var settings = {
        host: this.host,
        port: 22,
        protocol: 'ssh',
        username: this.username,
        password: this.password,
        autoEnable: false,
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
  }
}
