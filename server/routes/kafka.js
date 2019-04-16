"use strict";
/*
Kafka consumer for two different topics
*/
import AppConfig from   '../config/AppConfig';
var kafka = require('kafka-node');
var config = new AppConfig();

class KafkaConsumer {

  problemsConsumer() {
    var problems = new Array;
    
    var Consumer = kafka.Consumer,
      client = new kafka.KafkaClient(
        {kafkaHost: config.getKafkaBrokers(),
        sasl: { mechanism: 'PLAIN',
              username: 'token',
              password: config.getKafkaApiKey()}
        }),
      consumer = new Consumer(
           client,
           [{ topic: config.getProblemTopicName(), partition: 0 }
           ],
           {autoCommit: true,
            fromOffset: 'latest'
           }
        );

    consumer.on('message', function (message) {
      // console.log("In problem consumer:" + message.value);
      problems.push(message.value);
    });

    consumer.on('error', function (err) {
       console.error("In problem consumer the err "+err);
       return err;
    });
    return problems;
   }

   kafkaShipPosition() {
 
    var shipPositionList = new Array;

    var Consumer = kafka.Consumer,
        client = new kafka.KafkaClient(
          {kafkaHost: config.getKafkaBrokers(),
            sasl: { mechanism: 'PLAIN',
                  username: 'token',
                  password: config.getKafkaApiKey()}
          }),
        consumer = new Consumer(
            client,
            [
                { topic: config.getShipTopicName(), partition: 0 }
            ],
            [
              {
                autoCommit: true
              },
              {
                fromOffset: 'latest'
              }
            ]
          );

          consumer.on('message', function (message) {
              console.log("In ship position js consumer file");
              console.log(message.value);
              shipPositionList.push(message.value);
            });

      consumer.on('error', function (err) {
        console.log("This is the err "+err);
        return err;
      });

      return shipPositionList;

    }
}
export default KafkaConsumer;
