const rest = require('./api/rest');
const securityFile = require('../securityFile')


const method = 'POST';
const uri = "";
const rejectCert = false;
const headers = "";
const body = {
  "name": "string",
  "protocolOrder": "ssh",
  "snmpVersion": "v2",
  "ipAddressList": "string",
  "discoveryType": "multi range",
  "retry": 2,
  "reDiscovery": true,
  "timeout": 2
};

class apicDiscovery extends rest {
  constructor (method,uri,rejectCert,headers,body){
    super(method,uri,rejectCert,headers,body)
    this.discoveryList = [];
    this.uriBase = "";
    this.discoveryTickets = [];
  }

  setHeaders (ticket){
    this.headers = {
        "content-type": "application/json",
        "x-auth-token": ticket,
      };
  }

  setBody (name,type,ipList){
    this.body.name = name;
    this.body.discoveryType = type;
    this.body.ipAddressList = ipList;
  }

  setUriBase (uriBase){
    const newUri = uriBase+"api/v1/discovery"
    this.uri = newUri;
    this.uriBase = uriBase;
  }

  setUri (uri){
    const newUri = this.uriBase + uri;
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

  setDiscoveryTickets (discovery) {
    let newDiscoveryTickets = [discovery];
    this.discoveryTickets.push(newDiscoveryTickets)
  }

  getDiscoveryTickets () {
    return this.discoveryTickets;
  }

  // Adds a Debugs for the contest of the Ticket POST HTTP request
  debug() {
    console.log("method: "+this.method,'\n',"uri: "+this.uri,'\n',"rejectCert: "+this.rejectCert,'\n',"uriBase: "+this.uriBase,'\n',"headers: "+JSON.stringify(this.headers),'\n',"body: "+JSON.stringify(this.body))
  }
}

module.exports = new apicDiscovery(method,uri,rejectCert,headers,body)
