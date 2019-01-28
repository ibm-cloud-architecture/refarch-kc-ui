import { expect, assert }  from 'chai';
import ShipPositionConsumer from '../routes/ShipPositionConsumer';
import * as domain from '../routes/fleetDomain';
import ShipPositionProducer from './ShipPositionProducer';
import * as KafkaProducer from './KafkaProducer.js';

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

        let producer: ShipPositionProducer = new ShipPositionProducer();

        producer.ShipTopicProducer({shipID:"JimminyCricket",status:"AtSea"});

        console.log(" confirm ready")

        let consumer: ShipPositionConsumer = new ShipPositionConsumer();

        consumer.ShipTopicConsumer().then(()=>{
          let shipEvent:domain.ShipPosition = consumer.getShipPosition("JimminyCricket");
          assert.isOk(shipEvent);
        });

        //producer.stopProducer();
        //consumer.stopConsumer();
    });
});
