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
    return new Promise((resolve, reject) =>{
      let data = this.inputFile = "/"+fileName;
      if (data){
        resolve(data);
      } else {
        reject();
      }
    })
  }

  getData() {
    return new Promise((resolve, reject) =>{
      let data = this.fileData;
      if (data){
        resolve(data);
      } else {
        reject();
      }
    })
  }

  readFile(){
    return new Promise((resolve, reject) =>{
      let data
      let filePath = this.dataPath+this.inputFile;
      data = fs.readFileSync(filePath).toString();
      if (data){
        this.fileData = data;
        resolve(data);
      } else {
        reject();
      }
    })
  }

  writeFile (fileName){
    return new Promise((resolve, reject) =>{
      let data ,dataPath
      let newFile = fileName+this.saveExtension;
      let filePath = this.dataPath+newFile;
      fs.writeFileSync(this.dataPath, newFile);
      dataPath = path.existsSync(filePath);
      if (dataPath){
        resolve(dataPath);
      } else {
        reject();
      }
    })

    let newFile = fileName+this.saveExtension;
    fs.writeFileSync(this.dataPath, inputFile);
  }

  get(){
    return (
      {anotherTestResponse: "Cats on everything from API REst GET"}
    )
  }
}
