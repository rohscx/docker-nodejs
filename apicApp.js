var restReqeust = require('./modules/apicTicket');

restReqeust.p.then(function(httpReturn){
  console.log(httpReturn);
})

//console.log(test) // REST POST
