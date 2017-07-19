var rest = require('./api/rest');
module.exports = () => {
  return (
    {
      testResponse: "Cats on everything from Apic Ticket",
      test:rest.POST(),
      test2:rest.GET(),
      test3:rest.tad
    }
  );
}
