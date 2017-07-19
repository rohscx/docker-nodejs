var rest = require('./api/rest');
module.exports = () => {
  var newRest = rest.httpRequest();
  var output = newRest.anotherTestResponse;
  return (
    {
      testResponse: "Cats on everything from Apic Ticket",
      test:output
    }
  );
}
