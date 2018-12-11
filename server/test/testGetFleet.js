// Test get the fleet names list

const service = require('../routes/fleetClient');
var expect = require('chai').expect;

describe('fleet client', function() {
  it('should return at least 3 fleet names on GET fleetnames', async function(){
    let names = service.getFleetNames( names => {
      console.log(names);
      expect(names).to.have.lengthOf.above(2);
    });
   
  });

  it ('should return ships',  function() {
    service.getShips("KC-NorthAtlantic", data => {
      console.log(data);
      expect(data.ships).to.have.lengthOf.above(1);
    });
   
  });

  it('should start the ship movement simulation', function(){
    service.fleetSimulation({fleetName: "KC-NorthAtlantic", command: "START", numberOfMinutes:number = 2})
  });
});


