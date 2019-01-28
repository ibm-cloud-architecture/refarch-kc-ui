import { expect, assert }  from 'chai';
import * as domain from '../routes/fleetDomain';
import ProblemProducer from './ProblemProducer';
import ProblemTopicConsumer from '../routes/ProblemTopicConsumer';

async function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

describe('Get Problem status api', function() {
    it('should return no problem event', async function(){
        let consumer = new ProblemTopicConsumer();
        let probEvent = consumer.getProbEvent("JimminyCricket");
        assert.isNotOk(probEvent);
      });

    it('should return one problem event', function(){
        console.log("Entered one problem event");
        let producer: ProblemProducer = new ProblemProducer();
        console.log("Initiated Problem producer");

        producer.ProblemTopicProducer({issue:"combustion",containerId:"c134",shipId:"JimminyCricket",status:"AtSea"});



        let consumer = new ProblemTopicConsumer();
        console.log("Initialized the consumer");
        consumer.ProbTopicConsumer();

        //producer.stopProducer();
        //consumer.stopConsumer();
    });
});
