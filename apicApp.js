const apicTicket = require('./modules/apicTicket');
const apicDevices = require('./modules/apicDevices');
const apicConfig = require('./modules/apicConfig');
const apicReachability = require('./modules/apicReachability');
const apicDiscovery = require('./modules/apicDiscovery');
const ipTools = require('./modules/ipTools');
const rl = require('readline');
const files = require('./modules/files');

var chalk       = require('chalk');
var clear       = require('clear');
var CLI         = require('clui');
var figlet      = require('figlet');
var inquirer    = require('inquirer');
var Preferences = require('preferences');
var Spinner     = CLI.Spinner;
var GitHubApi   = require('github');
var _           = require('lodash');
var git         = require('simple-git')();
var touch       = require('touch');
var fs          = require('fs');




// apic-EM user menu. not deep very shallow
clear();
console.log(
  chalk.yellow(
    figlet.textSync('Ginit', { horizontalLayout: 'full' })
  )
);
/*
if (files.directoryExists('.git')) {
  console.log(chalk.red('Already a git repository!'));
  process.exit();
}
*/
var github = new GitHubApi({
  version: '3.0.0'
});

function getGithubCredentials(callback) {
  var questions = [
    {
      name: 'username',
      type: 'input',
      message: 'Enter your Github username or e-mail address:',
      validate: function( value ) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your username or e-mail address';
        }
      }
    },
    {
      name: 'password',
      type: 'password',
      message: 'Enter your password:',
      validate: function(value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your password';
        }
      }
    }
  ];

  inquirer.prompt(questions).then(callback);
}

function getGithubToken(callback) {
  var prefs = new Preferences('ginit');

  if (prefs.github && prefs.github.token) {
    return callback(null, prefs.github.token);
  }

  getGithubCredentials(function(credentials) {
    var status = new Spinner('Authenticating you, please wait...');
    status.start();

    github.authenticate(
      _.extend(
        {
          type: 'basic',
        },
        credentials
      )
    );

    github.authorization.create({
      scopes: ['user', 'public_repo', 'repo', 'repo:status'],
      note: 'ginit, the command-line tool for initalizing Git repos'
    }, function(err, res) {
      status.stop();
      if ( err ) {
        return callback( err );
      }
      if (res.token) {
        prefs.github = {
          token : res.token
        };
        return callback(null, res.token);
      }
      return callback();
    });
  });
}

function createRepo(callback) {
  var argv = require('minimist')(process.argv.slice(2));

  var questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Enter a name for the repository:',
      default: argv._[0] || files.getCurrentDirectoryBase(),
      validate: function( value ) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter a name for the repository';
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      default: argv._[1] || null,
      message: 'Optionally enter a description of the repository:'
    },
    {
      type: 'list',
      name: 'visibility',
      message: 'Public or private:',
      choices: [ 'public', 'private' ],
      default: 'public'
    }
  ];

  inquirer.prompt(questions).then(function(answers) {
    var status = new Spinner('Creating repository...');
    status.start();

    var data = {
      name : answers.name,
      description : answers.description,
      private : (answers.visibility === 'private')
    };

    github.repos.create(
      data,
      function(err, res) {
        status.stop();
        if (err) {
          return callback(err);
        }
        return callback(null, res.ssh_url);
      }
    );
  });
}

function createGitignore(callback) {
  var filelist = _.without(fs.readdirSync('.'), '.git', '.gitignore');

  if (filelist.length) {
    inquirer.prompt(
      [
        {
          type: 'checkbox',
          name: 'ignore',
          message: 'Select the files and/or folders you wish to ignore:',
          choices: filelist,
          default: ['node_modules', 'bower_components']
        }
      ]
    ).then(function( answers ) {
        if (answers.ignore.length) {
          fs.writeFileSync( '.gitignore', answers.ignore.join( '\n' ) );
        } else {
          touch( '.gitignore' );
        }
        return callback();
      }
    );
  } else {
    touch('.gitignore');
    return callback();
  }
}

function setupRepo(url, callback) {
  var status = new Spinner('Setting up the repository...');
  status.start();

  git
    .init()
    .add('.gitignore')
    .add('./*')
    .commit('Initial commit')
    .addRemote('origin', url)
    .push('origin', 'master')
    .then(function(){
      status.stop();
      return callback();
    });
}

function githubAuth(callback) {
  getGithubToken(function(err, token) {
    if (err) {
      return callback(err);
    }
    github.authenticate({
      type : 'oauth',
      token : token
    });
    return callback(null, token);
  });
}

githubAuth(function(err, authed) {
  if (err) {
    switch (err.code) {
      case 401:
        console.log(chalk.red('Couldn\'t log you in. Please try again.'));
        break;
      case 422:
        console.log(chalk.red('You already have an access token.'));
        break;
    }
  }
  if (authed) {
    console.log(chalk.green('Sucessfully authenticated!'));
    createRepo(function(err, url){
      if (err) {
        console.log('An error has occured');
      }
      if (url) {
        createGitignore(function() {
          setupRepo(url, function(err) {
            if (!err) {
              console.log(chalk.green('All done!'));
            }
          });
        });
      }
    });
  }
});





/* These can be broken up into speperate .js files to accomplish a task
   ultimately some user interaction front end should be build, but this is a
   quick ad dirty....
   Note to self 240 characters can hold about 8 ip RANGES. <-- Batch Maximum!!
*/

let apiccReachability= () => {
  let processSuccess = false;
  return new Promise((resolve, reject) =>{
    apicTicket.debug()
    apicTicket.httpRequest()
      .then((ticketReturn) =>{
        console.log(ticketReturn);
        apicTicket.setTicketData(ticketReturn.response);
        apicReachability.setHeaders(apicTicket.getTicketData())
        apicReachability.setUriBase(apicTicket.getUriBase())
        return apicReachability.httpRequest()
      })
      .then((devicesReturn) =>{
        console.log(devicesReturn)
        processSuccess = true;
        if (processSuccess) {
          resolve (devicesReturn)
        } else {
          reject("Something went wrong")
        };
      })
      .catch((httpReject) =>{
        console.log(httpReject);
      })
  })
};



let apiccDevices = () => {
  let processSuccess = false;
  return new Promise((resolve, reject) =>{
    apicTicket.debug()
    apicTicket.httpRequest()
      .then((ticketReturn) =>{
        console.log(ticketReturn);
        apicTicket.setTicketData(ticketReturn.response);
        apicDevices.setHeaders(apicTicket.getTicketData())
        apicDevices.setUriBase(apicTicket.getUriBase())
        return apicDevices.httpRequest()
      })
      .then((devicesReturn) =>{
        console.log(devicesReturn)
        processSuccess = true;
        if (processSuccess) {
          resolve (devicesReturn)
        } else {
          reject("Something went wrong")
        };
      })
      .catch((httpReject) =>{
        console.log(httpReject);
      })
  })
};



// Reads the value of a properly formated CSV file, processes it, and stores it.
let apiccDiscovery = () => {
  let processSuccess = false;
  return new Promise((resolve, reject) =>{
    Promise.all([ipTools.setFile("ipList.csv"),ipTools.readFile()])
    .then((promiseReturn)=>{
      console.log(promiseReturn);
      return Promise.all([ipTools.cleanData(),ipTools.sortData(),ipTools.setBase(),ipTools.setSuperNet()])
    })
    .then((promiseReturn)=>{
      console.log(promiseReturn);
    })
    .catch((reject) =>{
      console.log(reject);
    })


    apicTicket.debug()
    apicTicket.httpRequest()
      .then((ticketReturn) =>{
        console.log(ticketReturn);
        apicTicket.setTicketData(ticketReturn.response);
        apicDiscovery.setHeaders(apicTicket.getTicketData());
        apicDiscovery.setUriBase(apicTicket.getUriBase());
        // Uses IP list to generate array with IP range and Job name objects
        apicDiscovery.setDiscoveryList(ipTools.getIpRange(),"JOBNAME_JOBDESCRIPTION_");
        console.log(apicDiscovery.getDiscoveryList())
        let discoveryList = apicDiscovery.getDiscoveryList();
        return new Promise((resolve, reject) =>{
          discoveryList.map((data) =>{
            let type = "multi range";
            //console.log(data);
            //console.log(data[0].jobName);
            //console.log(data[0].ipRange);
            apicDiscovery.setBody(data[0].jobName,type,data[0].ipRange);
            apicDiscovery.debug();
            //Uses ticket to pull device list
            return apicDiscovery.httpRequest()
            .then((discoveryReturn) =>{
              apicDiscovery.setDiscoveryTickets(discoveryReturn);
              // normalizes indexOf to work with .length
              let indexPosition = discoveryList.indexOf(data) + 1;
              let dataLength = discoveryList.length;
              // Verifies all array items have been processed before resolving promise
              if (indexPosition == dataLength) {
                  resolve(apicDiscovery.getDiscoveryTickets());
              }
            })
            .catch((httpReject) =>{
              console.log(httpReject);
            })
          })
        })
        .then((discoveryResult) =>{
          discoveryResult.map((data) => {
            console.log(data);
            console.log(data[0].response.url);
            apicDiscovery.setUri(data[0].response.url);
            apicDiscovery.setNewReqest();
            return apicDiscovery.httpRequest()
            .then((status) =>{
              console.log(status);
              ipTools.setSaveExtentions(".json")
              return ipTools.writeFile(status.response.rootId,JSON.stringify(status, null, 2))
              .then((writeReturn) => {
                console.log(writeReturn)
                processSuccess = true;
                if (processSuccess) {
                  resolve(processSuccess);
                } else {
                  reject("something went wrong")
                }
              })
              .catch((httpReject) =>{
                console.log(httpReject);
              })
            })
          })
        })
      })
      // Catches any errors from the HTTP Rest Request
      .catch((httpReject) =>{
        console.log(httpReject);
      })
  })
}


/*
// Gets an ApicEM Ticket
// Apic Ticket debug
apicTicket.debug()
apicTicket.httpRequest()
  .then((ticketReturn) =>{
    console.log(ticketReturn);
    apicTicket.setTicketData(ticketReturn.response);
    apicDevices.setHeaders(apicTicket.getTicketData());
    apicDevices.setUriBase(apicTicket.getUriBase());
    // Uses ticket to pull device list
    return apicDevices.httpRequest();
  })
  .then((devicesReturn) =>{
    console.log(devicesReturn);
    apicConfig.setHeaders(apicTicket.getTicketData());
    apicConfig.setUriBase(apicTicket.getUriBase());
    apicConfig.setDeviceId("4af8bf34-295f-46f4-97b7-0a2d2ea4cf22");
    apicConfig.setUri();
    // Uses ticket to pull a single device config
    return apicConfig.httpRequest();
  })
  .then((configReturn) =>{
    // prints out stringified JSON
    console.log(JSON.stringify(configReturn));
    // prints out pretty string
    console.log(configReturn.response.toString())
    apicReachability.setHeaders(apicTicket.getTicketData());
    apicReachability.setUriBase(apicTicket.getUriBase());
    // Uses ticket to pull device reachablidy information
    return apicReachability.httpRequest();
  })
  .then((reachabilityReturn) =>{
    console.log(reachabilityReturn);
  })
  // Catches any errors from the HTTP Rest Request
  .catch((httpReject) =>{
    console.log(httpReject);
  })
*/
