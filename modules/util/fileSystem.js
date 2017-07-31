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
    this.loadExtension = ".csv";
    this.outputFile = outputFile;
    this.dataPath = "/home/node_dev/nodeProjects/docker-nodejs/serverData";
    this.fileData ="";
  }

  setSaveExtentions (extension){
    return new Promise((resolve, reject) =>{
      let data = extension;
      let message = "Extention changed to: "+ data;
      if (data){
        this.saveExtension = data;
        resolve(message);
      } else {
        reject();
      }
    })
  }

  setLoadExtentions (extension){
    return new Promise((resolve, reject) =>{
      let data = extension;
      let message = "Extention changed to: "+ data;
      if (data){
        this.saveLoadExtension = data;
        resolve(message);
      } else {
        reject();
      }
    })
  }

  setFile (fileName){
    return new Promise((resolve, reject) =>{
      let data = "/"+fileName+this.loadExtension;
      if (data){
        this.inputFile = data;
        resolve(data);
      } else {
        reject();
      }
    })
  }

  setJsonFile (fileName){
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
      let data = this.fileData.contents;
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
          this.fileData = {contents: data.toString()};
          console.log("DATA LOADED..   ",this.fileData);
          return resolve(data.toString());
        }
      })
    })
  }


  readJsonFile(){
    return new Promise((resolve, reject) =>{
      let filePath = this.dataPath+this.inputFile;
      fs.readFile(filePath,'utf8',(err,data)=>{
        if (err){
          return reject(err);
        } else {
          let fileObj = JSON.parse(data);

          this.fileData = {contents: fileObj};
          console.log("DLATA LLOADED   ",this.fileData);
          return resolve(this.fileData);
        }
      })
    })
  }

  writeFile (fileName,fileContent){
    return new Promise((resolve, reject) =>{
      let data ,dataPath, dataReturn
      let newFileName = "/"+fileName+this.saveExtension;
      let filePath = this.dataPath+"/saved"+newFileName;
      fs.writeFile(filePath, fileContent, (err) => {
        if (err) return reject(err);
        dataReturn = "Saved! "+path.basename(filePath) +"   file path: "+ path.dirname(filePath);
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
