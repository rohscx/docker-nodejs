const fs = require('fs');
const path = require('path');
const fileSystem = require('./util/fileSystem')
//path.normalize(): example /opt/datafiles/about.html
//path.dirname();  example /opt/datafiles
//path.basename(); example about.html
//path.extname(); example .html


let defualtSecuirtyFile = `
module.exports = {
  private:{
    apicEM:{
      uName: false,
      uPass: false,
      uri: false
    },
    sshUser:{
      uName: false,
      uPass: false,
      host:"localhost"
    },
    ise:{
      uName: false,
      uPass: false,
      uri: false
    },
    prtg:{
      uName: false,
      uPass: false,
      uri: false
    }
  },
  public:{
    apicEM:{
      uName:"devnetuser",
      uPass:"Cisco123!",
      uri:"https://devnetapi.cisco.com/sandbox/apic_em"
    }
  }
};
  `

class securityFile extends fileSystem {
  constructor (inputFile,outputFile){
    super(inputFile,outputFile)
    this.dataPath = "/home/node_dev/nodeProjects/docker-nodejs/";
    this.defualtSecuirtyFile = defualtSecuirtyFile;
  }

  setSecurityFile(securityFileData){
    this.defualtSecuirtyFile = securityFileData;
  }

  getSecurityFile(){
    return this.defualtSecuirtyFile;
  }

  setFile (fileName){
    return new Promise((resolve, reject) =>{
      let data = fileName+this.loadExtension;
      if (data){
        this.inputFile = data;
        resolve(data);
      } else {
        reject();
      }
    })
  }

  writeFile (fileName,fileContent){
    return new Promise((resolve, reject) =>{
      let data ,dataPath, dataReturn
      let newFileName = fileName+this.saveExtension;
      let filePath = this.dataPath+newFileName;
      fs.writeFile(filePath, fileContent, (err) => {
        if (err) return reject(err);
        dataReturn = "Saved! "+path.basename(filePath);
        return resolve(dataReturn);
        });
    })
  }

  // Adds a Debugs for the contest of the Ticket POST HTTP request
  debug() {
    console.log("inputFile: "+this.inputFile,'\n',"outputFile: "+outputFile.uri,'\n')
  }
}

module.exports = new securityFile()
