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
      let data = "/"+fileName;
      if (data){
        this.inputFile = data;
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
      let fileData
      let filePath = this.dataPath+this.inputFile;
      fs.readFile(filePath, (err, data)=>{
        if (err){
          return reject(err);
        } else {
          this.fileData = data.toString();
          console.log("DLATA LLOADED   ",this.fileData);
          return resolve(data.toString());
        }
      })
    })
  }

  writeFile (fileName, fileContent){
    return new Promise((resolve, reject) =>{
      let data ,dataPath, dataReturn
      let newFileName = "/"+fileName+this.saveExtension;
      let filePath = this.dataPath+newFileName;
      fs.writeFile(filePath, fileContent, (err) => {
        if (err) return reject(err);
        dataReturn = "Saved! "+path.basename(filePath);
        console.log(path.basename(filePath))
        return resolve(dataReturn);
        });
    })

    //let newFile = fileName+this.saveExtension;
    //fs.writeFileSync(this.dataPath, inputFile);
  }

  get(){
    return (
      {anotherTestResponse: "Cats on everything from API REst GET"}
    )
  }
}
