"use strict";
/*
Kafka consumer for two different topics
*/
const config = require("../config/config.json");
class KafkaConsumer {

  problemsConsumer() {
    var problems = new Array;
    var kafka = require('kafka-node'),
      Consumer = kafka.Consumer,
      client = new kafka.KafkaClient({kafkaHost: process.env.KAFKA_BROKERS || config.kafkaBrokers}),
      consumer = new Consumer(
           client,
           [{ topic: config.problemTopicName, partition: 0 }
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

    var kafka = require('kafka-node'),
        Consumer = kafka.Consumer,
        client = new kafka.KafkaClient({kafkaHost: process.env.KAFKA_BROKERS ||  config.kafkaBrokers}),
        consumer = new Consumer(
            client,
            [
                { topic: config.shipTopicName, partition: 0 }
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
