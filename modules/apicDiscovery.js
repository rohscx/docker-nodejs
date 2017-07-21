const rest = require('./api/rest');
const securityFile = require('../securityFile')


const method = 'POST';
const uri = securityFile.public.apicEM.uri+"/discovery";
const headers = "";
const body = {
  "snmpVersion": "v2",
  "ipAddressList": "string",
  "discoveryType": "multi range",
  "retry": 2,
  "name": "string",
  "reDiscovery": true,
  "timeout": 2
};

class apicDiscovery extends rest {
  constructor (method,uri,headers,body){
    super(method,uri,headers,body)
    this.discoveryList = [];
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

  setDiscoveryList (ipList,name){
    let ipRangeHold ={
      jobName: "",
      ipRange: ""
    };
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
        console.log(ipList.length);
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
