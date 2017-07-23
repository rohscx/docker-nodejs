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
    this.cleanedData = "";
    this.sortedData = "";
    this.ipRange = "";
    this.ipBase2 = "";
  }

  setSuperNet () {
    return new Promise((resolve, reject) =>{
      let firstIp,lastIp,nextPredict,truth;
      let dataBase2 = this.ipBase2;
      let nextP = (binary) => {
        let baseTen = parseInt(binary, 2);
        baseTen.toString(2)
        baseTen ++
        return baseTen.toString(2);
      }
      dataBase2.map((data) =>{
        firstIp = data;

        if (firstIp == nextPredict) {
          console.log("MATCH?   :",firstIp == nextPredict)
          nextPredict = [data[0],data[1],data[2],nextP(data[3])]
          console.log (" 0ACCTUAL==   ",firstIp," 0PREDICTION==   ",nextPredict)
        } else {


          //console.log(typeof('last[0]'),typeof('last[1]'),typeof('last[2]'),typeof('nextP(data[3])'))
          console.log(nextPredict)
          //console.log(typeof('nextPredict[0]'),typeof('nextPredict[1]'),typeof('nextPredict[2]'),typeof('nextPredict[3]'))
          //console.log(typeof('first[0]'),typeof('first[1]'),typeof('first[2]'),typeof('first[3]'))

          nextPredict = [data[0],data[1],data[2],nextP(data[3])]

          if (lastIp){
            console.log (" FIRST_IP==   ",firstIp," 1PREDICTION==   ",nextPredict)
            console.log (" 1LAST_IP==   ",lastIp," 1PREDICTION==   ",nextPredict)
            console.log(typeof('lastIp'))
            console.log(typeof('lastIp[0]'),typeof('lastIp[1]'),typeof('lastIp[2]'),typeof('lastIp[3]'))
            console.log(lastIp[0].length,lastIp[1].length,lastIp[2].length,lastIp[3].length)
            console.log("compare lastIp and firstIP",lastIp[3] === firstIp[3])
            let index;
            for (index = 0; index < lastIp.length; ++index) {
              console.log("char lastIp " + index + ": " + lastIp[index].charCodeAt(index));
            }
          }
          console.log(typeof('firstIp'))
          console.log(typeof('firstIp[0]'),typeof('firstIp[1]'),typeof('firstIp[2]'),typeof('firstIp[3]'))
          console.log(firstIp[0].length,firstIp[1].length,firstIp[2].length,firstIp[3].length)
          let index;
          for (index = 0; index < firstIp.length; ++index) {
            console.log("char firstIp " + index + ": " + firstIp[index].charCodeAt(index));
          }
          lastIp = nextPredict;
        }

      })
    })
  }

  setBase (){
    return new Promise((resolve, reject) =>{
      let newArray = [];
      let ipList = this.sortedData;
      ipList.map((data) =>{
        let temp1 = [];
        let octants = data.split(".");
        octants.map((data1) =>{
          let temp = parseInt(data1,10)
          temp1.push(temp.toString(2))
        })
        newArray.push(temp1);
      })
      if (newArray){
        this.ipBase2 = newArray;
        resolve(newArray)
      } else {
        reject("Nothing to See")
      }
    })
  }

  getIpRange (){
    return this.ipRange;
  }

  cleanData (){
    return new Promise((resolve, reject) =>{
      let cleanedData =[];
      let newData = this.fileData.dataString.split("\n");
      newData = newData.filter(Boolean);
      newData.map((data) => {
        cleanedData.push(data.trim())
      })
      if (cleanedData){
        this.cleanedData = cleanedData;
        resolve(cleanedData);
      } else {
        reject("Error Cleaning");
      }
    })
  }

  sortData (){
    return new Promise((resolve, reject) =>{
      let sortedData = this.cleanedData.sort((a,b)=>{
	      let aa = a.split(".");
	      var bb = b.split(".");
        return ( aa[0]*0x1000000 + aa[1]*0x10000 + aa[2]*0x100 + aa[3]*1 )
             - ( bb[0]*0x1000000 + bb[1]*0x10000 + bb[2]*0x100 + bb[3]*1 );
           })
      if (sortedData){
        this.sortedData = sortedData;
        resolve(sortedData)
      } else {
        reject("Error Sorting");
      }
    })
  }

  formatData (expandBy) {
    return new Promise((resolve, reject) =>{
      let ipRange = [];
      let badData = [];
      let skipped = [];
      let newData = this.sortedData;
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
              let newRange = data+"-"+data;
              ipRange.push(newRange);
            } else {
              let newRange = data+"-"+data;
              // Just in case catch the rest
              let dataIndex = newData.indexOf(data) + 1;
              //skipped.push(data+"  <- index-("+dataIndex+")");
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
          this.ipRange = ipRange;
          resolve(ipRange);
        }
    })

  }

  // Adds a Debugs for the contest of the Ticket POST HTTP request
  debug() {
    console.log("inputFile: "+this.inputFile,'\n',"outputFile: "+outputFile.uri,'\n')
  }
}

module.exports = new ipTools()
