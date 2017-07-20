const apicTicket = require('./modules/apicTicket');

/*
apicTicket.POST().then((httpReturn)=>{
  console.log(httpReturn);
})
*/

let getTicket = new apicTicket();
apicTicket.debug()

//console.log(test) // REST POST
