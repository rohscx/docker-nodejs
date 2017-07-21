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
    let newFileName = "/"+fileName
    this.inputFile = newFileName;
  }

  readFile (){
    return new Promise((resolve, reject) =>{
      fs.readFileSync(this.dataPath+this.inputFile, (err, data) => {
        if (err) {
          console.log("errr  ",err,data);
          reject(err)
        } else {
          console.log("datata:  ",err,data);
          resolve(data)
        }
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
