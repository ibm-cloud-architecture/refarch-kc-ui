// A class to send a problem to the bluewaterProblem topic

import * as domain from '../routes/fleetDomain';
import AppConfig  from '../config/AppConfig';
const kafka = require('kafka-node');
var Producer = kafka.Producer;
declare const Buffer;

export default class ProblemProducer {
    config:AppConfig;
    producer: any;
    producerReady: boolean = false;


    constructor() {
        this.config =  new AppConfig();
    }

    public ProblemTopicProducer(p:domain.ProblemReport){

      let positionvarAsString = JSON.stringify(p);
      const buffer = new Buffer.from(positionvarAsString);

      var kafka = require('kafka-node'),
          Producer = kafka.Producer,
          KeyedMessage = kafka.KeyedMessage,
          client = new kafka.KafkaClient(),
          producer = new Producer(client),
          km = new KeyedMessage('key', 'message'),
          payloads = [
              { topic: 'blueProblem', messages: buffer, partition: 0 }
          ];

          producer.on('ready', function () {
            producer.send(payloads, function (err, data) {
              console.log("Prodcuer sending the messages");
              console.log(data);
            });
          });

          producer.on('error', function (err) {});

        }

    public stopProducer(){
        this.producer.close(true, () => {
            console.log("Stop problem producer");
        })
    }
}

