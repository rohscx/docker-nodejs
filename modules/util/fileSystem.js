const fs = require('fs');
const path = require('path');

//path.normalize(): example /opt/datafiles/about.html
//path.dirname();  example /opt/datafiles
//path.basename(); example about.html
//path.extname(); example .html

//
module.exports = class fileSystem {
  constructor (inputFile,outputFile){
    this.inputFile = "/"+inputFile;
    this.saveExtension = ".csv";
    this.outputFile = outputFile;
    this.dataPath = "/home/node_dev/nodeProjects/docker-nodejs/serverData";
    this.fileData ="";
  }

  setFile (fileName){
    this.inputFile = fileName;
  }

  readFile (){
    return new Promise((resolve, reject) =>{
      fs.readFileSync(this.dataPath+this.inputFile).toString()
      .then((data) =>{
        data = this.fileData;
        resolve(apicDiscovery.getDiscoveryTickets());
      })
      .catch((err) =>{
        console.log(err);
        // Deal with the error
        reject(err);
      })
    })
  }

  writeFile (fileName){
    let newFile = fileName+this.saveExtension;
    fs.writeFileSync(this.dataPath, inputFile);
  }

  get(){
    return (
      {anotherTestResponse: "Cats on everything from API REst GET"}
    )
  }
}
