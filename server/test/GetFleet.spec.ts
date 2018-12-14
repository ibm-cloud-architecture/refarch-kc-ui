// Test get the fleet names list

//const service = require('../routes/fleetClient');
import { expect }  from 'chai';
import FleetClient from '../routes/FleetClient';
import * as domain from '../routes/fleetDomain';

describe('fleet client', function() {
  it('should return at least 3 fleet names on GET fleetnames', async function(){
    let service = new FleetClient();
     service.getFleetNames().then((fleets: domain.Fleet[]) => {
      console.log(fleets);
      expect(fleets).to.have.lengthOf.above(2);
    });  
  });
  it ('should return ships',  function() {
    let service = new FleetClient();
    service.getFleetByName("KC-NorthAtlantic").then((data: domain.Fleet) => {
      console.log(data);
      expect(data.ships).to.have.lengthOf.above(1);
    });
   
  });

  it('should start the fleet  simulation', function(){
    let service = new FleetClient();
    service.fleetSimulation({fleetName: "KC-NorthAtlantic", command: "START", numberOfMinutes:2})
    .then( (data: domain.SimulResponse) => {
      expect(data.status).to.be.equal("Started");
      service.fleetSimulation({fleetName: "KC-NorthAtlantic", command: "STOP", numberOfMinutes:2})
      .then( (data: domain.SimulResponse) => {
        expect(data.status).to.be.equal("Stopped");
      })
    })
  });

  it('should start the ship movement simulation', function(){
    let service = new FleetClient();
    service.shipSimulation({shipName: "JimminyCricket", command: "REEFER_DOWN", numberOfMinutes:2})
    .then( (data: domain.Ship) => {
      expect(data.status).to.be.equal("AtSea");
    })
  });
  
});


