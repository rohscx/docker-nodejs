const rest = require('./api/rest');
const securityFile = require('../securityFile')


const method = 'POST';
const uri = "";
const headers = "";
const body = {
  "name": "",
  "reDiscovery": true,
  "retry": 2,
  "discoveryType": "multi range",
  "snmpVersion": "v2",
  "ipAddressList": "",
  "timeout": 2
}

class apicDiscovery extends rest {
  constructor (method,uri,headers,body){
    super(method,uri,headers,body)
    this.discoveryList = [];
    this.uriBase = "";
  }

  setHeaders (ticket){
    this.headers = {
        "content-type": "application/json",
        "x-auth-token": ticket,
      };
  }

  setBody (name,type,ipList){
    this.body.name = name;
    this.body.type = type;
    this.body.ipAddressList = ipList;
  }

  setUriBase (uriBase){
    const newUri = uriBase+"/discovery"
    this.uri = newUri;
  }

  setDiscoveryList (ipList,name){
    let ipRangeHold ={
      jobName: "",
      ipRange: ""
    };
    let ipListlength = ipList.length - 1;
    ipList.map((data) =>{
      if (ipList.indexOf(data) % 7 == 0) {
        if (ipList.indexOf(data) == 0) {
          ipRangeHold.ipRange += data+",";
        } else {
          ipRangeHold.jobName = name+ipList.indexOf(data);
          ipRangeHold.ipRange += data;
          let newIpList = [ ipRangeHold ];
          this.discoveryList.push(newIpList);
          ipRangeHold ={
            jobName: "",
            ipRange: ""
          };
        }
      } else {
        ipRangeHold.ipRange += data+",";
        console.log(ipListlength, ipList.indexOf(data));
        if (ipListlength == ipList.indexOf(data)) {
          ipRangeHold.jobName = name+ipList.indexOf(data);
          let newIpList = [ ipRangeHold ];
          this.discoveryList.push(newIpList);
        }
      }
    })
  }

  getDiscoveryList () {
    return this.discoveryList;
  }

  // Adds a Debugs for the contest of the Ticket POST HTTP request
  debug() {
    console.log("method: "+this.method,'\n',"uri: "+this.uri,'\n',"headers: "+JSON.stringify(this.headers),'\n',"body: "+JSON.stringify(this.body))
  }
}

module.exports = new apicDiscovery(method,uri,headers,body)
