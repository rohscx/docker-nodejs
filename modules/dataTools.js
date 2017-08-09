const fs = require('fs');
const path = require('path');
const fileSystem = require('./util/fileSystem')
//path.normalize(): example /opt/datafiles/about.html
//path.dirname();  example /opt/datafiles
//path.basename(); example about.html
//path.extname(); example .html

class dataTools extends fileSystem {
  constructor (inputFile,outputFile){
    super(inputFile,outputFile)
    this.cleanedData = "";
    this.sortedData = "";
    this.ipRange = "";
    this.ipBase2 = "";
    this.compare = {dataSet1:[],dataSet2:[]}
  }

  setCompare (dataSet1,dataSet2){
    this.compare.dataSet1 = dataSet1;
    this.compare.dataSet1 = dataSet2;
  }

  setDataSet1(name,data){
    let key = name;
    let obj = {};
    obj[key] = data;
    this.compare.dataSet1.push(obj)
    console.log("PUSHED",this.compare.dataSet1)
  }

  getDataSet1(){
    return this.compare.dataSet1;
  }

  // changes the base of a number, by default base 10 to base 2
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

  // return ip range. This is raw and uncleaned
  getIpRange (){
    return this.ipRange;
  }

  splitData(){
    let newData = this.fileData.contents.split(",");
    return newData;
  }

  // attempts to clean the ip list. remove leading spaces, trailling spaces and empty lines
  cleanData (){
    return new Promise((resolve, reject) =>{
      let cleanedData =[];
      let newData = this.fileData.contents.split(/[\n,]+/);
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

  // sorts cleaned IP address list by lowest to highest. data should be base 10
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

  getChunks(inputData){
    let toChunk = inputData;
    //console.log("Chunk DATA", toChunk)
    let chunkMax = Math.ceil(toChunk.length * .02);
    //console.log("CHUNK...",chunk);
    let chunkData = [];
    let chunkArray = [];
    let counter = 1;
    toChunk.map((data, index)=>{
      if ( counter <= chunkMax){
        counter ++
        chunkData.push(data)
      } else {
        chunkData.push(data)
        chunkArray.push(chunkData)
        chunkData = [];
        counter = 1;
      }
      //console.log(index)
    })
    // debug
    console.log(chunkArray)
    return chunkArray;
  }

  setSuperNet () {
    return new Promise((resolve, reject) =>{
      let firstIp,lastIp,nextPredict,superNet,count;
      //holds return data
      superNet = [];
      // counts ip address in the array
      count = 0;
      // pulls ip address list
      let dataBase2 = this.ipBase2;
      // geneates an array of ranges
      let makeRange = (ipArray1, ipArray2) =>{
        let ipRange = [];
        ipRange.push(ipArray1.join(".")+"-"+ipArray2.join("."));
        return ipRange;
      }
      // converts base2 numbers to base 10
      let baseConvert10 = (ipArray) =>{
        let ipAddress = [];
        ipArray.map((data) => {
          ipAddress.push(parseInt(data, 2));
        })
        return ipAddress;
      }
      // converts to base 10 and generates next number in sequence, returns base 2 number
      let nextP = (binary) => {
        let baseTen = parseInt(binary, 2);
        baseTen.toString(2)
        baseTen ++
        return baseTen.toString(2);
      }
      // generates sytehntic base 2 address. used in IP comparison
      let syntheticIp = (ipArray) => {
        let syntheticIp = ""
        ipArray.map((data) => {
          // debug
          /*
          console.log(data.toString().trim().charCodeAt())
          console.log(typeof('data'))
          */
          for (let index = 0; index < data.length; ++index) {
            let charCode = data.charCodeAt(index);
            if (charCode == 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57) {
              // debug
              /*
              console.log("char syntheticIp " + index + ": " + data.charCodeAt(index));
              console.log("hit ", charCode, " charCode  ", String.fromCharCode(charCode))
              */
              syntheticIp += String.fromCharCode(charCode)
            }
          }
        })
        return syntheticIp;
      }
      // processes the cleaned and verified IP address list.
      // attempts to create IP address ranges where possiable
      dataBase2.map((data) =>{
        count ++;
        if (lastIp){
          // debug
          /*
          console.log (" FIRST_IP==   ",firstIp," LAST_IP==   ",lastIp," THIS_IP==   ",data)
          console.log (" PREDICTED_IP==   ",nextPredict)
          console.log(typeof('lastIp[0]'),typeof('lastIp[1]'),typeof('lastIp[2]'),typeof('lastIp[3]'))
          console.log(lastIp[0].length,lastIp[1].length,lastIp[2].length,lastIp[3].length)
          */
          let ip1 = syntheticIp(data);
          let ip2 = syntheticIp(nextPredict);
          // debug
          //console.log("Was the prediction successful:  ",ip1 === ip2)
          if (ip1 == ip2) {
            lastIp = nextPredict;
            nextPredict = [data[0],data[1],data[2],nextP(data[3])]
            if (dataBase2.length == count){
              let firstIpBase10 = baseConvert10(firstIp);
              let lastIpBase10 = baseConvert10(lastIp);
              // debug
              //console.log("*********",makeRange(firstIpBase10,lastIpBase10));
              superNet.push(makeRange(firstIpBase10,lastIpBase10));
            }
          } else {
            let firstIpBase10 = baseConvert10(firstIp);
            let lastIpBase10 = baseConvert10(lastIp);
            // debug
            //console.log("*********",makeRange(firstIpBase10,lastIpBase10));
            superNet.push(makeRange(firstIpBase10,lastIpBase10));
            if (dataBase2.length == count){
              // debug
              // console.log("END OF ARRAY : ")
              let firstIpBase10 = baseConvert10(data);
              let lastIpBase10 = baseConvert10(data);
              // debug
              // console.log("*********",makeRange(firstIpBase10,lastIpBase10));
              superNet.push(makeRange(firstIpBase10,lastIpBase10));
            } else {
              firstIp = data;
              lastIp = firstIp;
              nextPredict = [data[0],data[1],data[2],nextP(data[3])]
            }
          }
        } else {
          firstIp = data;
          lastIp = firstIp;
          nextPredict = [data[0],data[1],data[2],nextP(data[3])]
          // debug
          /*
          console.log (" FIRST_IP==   ",firstIp," NEXT_PREDICTION==   ",nextPredict," THIS_IP==   ",data)
          console.log("###################################################################################")
          */
        }
      })
      if (superNet){
        this.ipRange = superNet;
        resolve(superNet)
      } else {
        // catches final error
        reject("Something is wrong with the dataset")
      }

    })
  }

  // Adds a Debugs for the contest of the Ticket POST HTTP request
  debug() {
    console.log("inputFile: "+this.inputFile,'\n',"outputFile: "+outputFile.uri,'\n')
  }
}

module.exports = new dataTools()
