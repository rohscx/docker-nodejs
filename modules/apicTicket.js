var rest = require('./api/rest');
module.exports = () => {
  var newRest = rest.POST;
  var newRest2 = rest.GET;
  var output = newRest;
  var output2 = newRest2;
  return (
    {
      testResponse: "Cats on everything from Apic Ticket",
      test:output,
      test2:output2
    }
  );
}
