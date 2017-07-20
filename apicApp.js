const apicTicket = require('./modules/apicTicket');

apicTicket.debug()

apicTicket.post().then((httpReturn)=>{
  console.log(httpReturn);
})



//console.log(test) // REST POST
