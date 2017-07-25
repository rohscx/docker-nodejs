const fs = require('fs');
const path = require('path');
const fileSystem = require('./util/fileSystem')
//path.normalize(): example /opt/datafiles/about.html
//path.dirname();  example /opt/datafiles
//path.basename(); example about.html
//path.extname(); example .html

class securityFile extends fileSystem {
  constructor (inputFile,outputFile){
    super(inputFile,outputFile)
    this.defualtSecuirtyFile ="
     private:{
        apicEM:{
          uName: false,
          uPass: false,
          uri: false
        }
      },
      public:{
        apicEM:{
          uName:\"devnetuser\",
          uPass:\"Cisco123!\",
          uri:\"https://devnetapi.cisco.com/sandbox/apic_em\"
        }
      };
      "
  }

  setSecurityFile(securityFileData){
    this.defualtSecuirtyFile = securityFileData;
  }

  getSecurityFile(){
    return this.defualtSecuirtyFile;
  }


  // Adds a Debugs for the contest of the Ticket POST HTTP request
  debug() {
    console.log("inputFile: "+this.inputFile,'\n',"outputFile: "+outputFile.uri,'\n')
  }
}

module.exports = new securityFile()
