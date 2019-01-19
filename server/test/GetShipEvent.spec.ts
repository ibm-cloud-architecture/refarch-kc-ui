import { expect, assert }  from 'chai';
import ShipPositionConsumer from '../routes/ShipPositionConsumer';
import * as domain from '../routes/fleetDomain';
import ShipPositionProducer from './ShipPositionProducer';

async function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

describe('Get ship status api', function() {
    it('should return no ship event', async function(){
        let consumer = new ShipPositionConsumer();
        let shipEvent = consumer.getShipPosition("JimminyCricket")
        assert.isNotOk(shipEvent);
      });  
    
    it('should return one ship event', function(){
        let consumer: ShipPositionConsumer = new ShipPositionConsumer();
        let producer: ShipPositionProducer = new ShipPositionProducer();

        consumer.startConsumer();
        producer.startProducer();
       
        async () => {
                while ( ! producer.producerReady) {
                    await delay(1000);
                    console.log(".")
                }
        }
        console.log(" confirm ready")
        producer.produceShipPosition({shipID:"JimminyCricket",status:"AtSea"});
        
        async () => {await delay(3000);}
        let shipEvent:domain.ShipPosition = consumer.getShipPosition("JimminyCricket")
        assert.isOk(shipEvent);
      
        producer.stopProducer();
        consumer.stopConsumer();
    });
});