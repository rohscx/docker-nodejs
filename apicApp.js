var restReqeust = require('./modules/apicTicket');

restReqeust.POST().then(function(httpReturn){
  console.log(httpReturn);
})

//console.log(test) // REST POST
