import { expect, assert }  from 'chai';
import * as domain from '../routes/fleetDomain';
import ProblemProducer from './ProblemProducer';
import ProblemTopicConsumer from '../routes/ProblemTopicConsumer';
import * as KafkaProducer from './KafkaProducer.js';

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

        let producer: ProblemProducer = new ProblemProducer();

        producer.ProblemTopicProducer({issue:"combustion",containerId:"c1",shipId:"JimminyCricket",status:"AtSea"});

        console.log(" confirm ready")

        let consumer: ProblemTopicConsumer = new ProblemTopicConsumer();

        consumer.ProblemTopicConsumer().then(()=>{
          let probEvent:domain.ProblemReport = consumer.getProbEvent("JimminyCricket");
          assert.isOk(probEvent);
        });

        //producer.stopProducer();
        //consumer.stopConsumer();
    });
});
