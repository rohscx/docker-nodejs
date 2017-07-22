const fs = require('fs');
const path = require('path');
const fileSystem = require('./util/fileSystem')
//path.normalize(): example /opt/datafiles/about.html
//path.dirname();  example /opt/datafiles
//path.basename(); example about.html
//path.extname(); example .html

class ipTools extends fileSystem {
  constructor (inputFile,outputFile){
    super(inputFile,outputFile)
    this.ipRange = "";
  }

  getIpRange (){
    return this.ipRange;
  }

  cleanData (){
    return new Promise((resolve, reject) =>{
      let newArray= this.fileData;
      let test = this.fileData.split("\r")
      let newData = this.fileData.split("\n");
      //
      if (newData){
        console.log(newData);
        console.log(newArray);
        console.log(test);
        resolve("NEW ENWENENWEWEJ   ",newData);
      } else {
        reject();
      }
    })
  }

  formatData (expandBy) {
    return new Promise((resolve, reject) =>{
      let ipRange = [];
      let badData = [];
      let skipped = [];
      let newData = this.fileData.split("\n");
      let i = 0;
      let fixup = newData.map((data) =>{
        let octants = data.split(".");
        // debug
        /*
        console.log(octants);
        console.log(octants.length);
        console.log(octants[3]);
        */
        for (i = 0 ; i < octants.length; i++) {
          // side effect is that this standardises the data to proper IP's only..
          if (i == 3) {
            // debug
            /*
            console.log(octants[i]);
            */
            if (octants[i] == 230) {
              let incrementBy = expandBy;
              // Converts string value to int and add the values
              let newOctant = Number(octants[i]) + incrementBy;
              // Creates
              let createIP = octants[0]+"."+octants[1]+"."+octants[2]+"."+newOctant;
              let newRange = data+"-"+createIP;
              // debug
              /*
              console.log(createIP);
              console.log(newRange);
              */
              ipRange.push(newRange);
              // Checks for IP address outside of the normal range
            } else if (octants[i] <= 229 + expandBy || octants[i] >= 241 + expandBy) {
              let newRange = data+"-"+data
              ipRange.push(newRange);
            } else {
              // Just in case catch the rest
              let dataIndex = newData.indexOf(data) + 1;
              skipped.push(data+"  <- index-("+dataIndex+")");
            }
            //  checks for malformed octant lengths
          } else if (octants.length <= 3 || octants.length >= 5) {
            let dataIndex = newData.indexOf(data) + 1;
            badData.push(data+"  <- index-("+dataIndex+")");
          }
        }})
        // debug
        /*
        console.log(newData);
        console.log(ipRange)
        */
        // If data Does not match the length requirement it is considered bad data!
        if (badData.length != 0) {
          let rejectMessage = "badData  ===>>  "+badData+"  <<===";
          reject(rejectMessage)
        } else if (skipped.length != 0) {
          let rejectMessage = "skipped  ===>>  "+skipped+"  <<===";
          reject(rejectMessage)
        } else {
          resolveMessage = "Nothing skipped. DataSet appears to be clean!!!"+'\n'+"No badData. DataSet appears to be clean!!!";
          this.ipRange = ipRange;
          resoleve(resolveMessage);
        }
    })

  }

  // Adds a Debugs for the contest of the Ticket POST HTTP request
  debug() {
    console.log("inputFile: "+this.inputFile,'\n',"outputFile: "+outputFile.uri,'\n')
  }
}

module.exports = new ipTools()
