var restReqeust = require('./modules/apicTicket');

test().then(function(){
  return (restReqeust.POST())
})

//console.log(test) // REST POST

