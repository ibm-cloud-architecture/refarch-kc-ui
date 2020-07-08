// A class to send a problem to the bluewaterProblem topic

import * as domain from '../routes/fleetDomain';
import AppConfig  from '../config/AppConfig';
import * as kafka from 'node-rdkafka';
declare const Buffer;

export default class ProblemProducer {
    config: AppConfig;
    producer: kafka.Producer;
    producerReady: boolean = false;

    constructor() {
        this.config = new AppConfig();
    }

    public ProblemTopicProducer(p:domain.ProblemReport){

      let positionvarAsString = JSON.stringify(p);
      const buffer = new Buffer.from(positionvarAsString);

      let producerConfig = {
        'metadata.broker.list': this.config.getKafkaBrokers()
      };

      this.producer = new kafka.Producer(producerConfig);

      this.producer.on('ready', () => {
        try {
          this.producer.produce(this.config.getProblemTopicName(), null, buffer);
        } catch (err) {
          console.error('Problem producer error');
          console.error(err);
        }
      });

      this.producer.on('event.error', (err) => {
        console.error('Problem producer error');
        console.error(err);
      });
    }

    public stopProducer(){
        this.producer.disconnect(() => {
            console.log("Stop problem producer");
        })
    }
}

