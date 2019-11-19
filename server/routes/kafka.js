"use strict";
/*
Kafka consumer for two different topics
*/
import AppConfig from   '../config/AppConfig';
var kafka = require('kafka-node');
var config = new AppConfig();
var fs = require('fs');

class KafkaConsumer {

  problemsConsumer() {
    var problems = new Array;

    var kafkaClientConfig = {
      kafkaHost: config.getKafkaBrokers()
    };

    if (config.isEventStreams()){
      kafkaClientConfig.sasl = {
        mechanism: 'PLAIN',
        username: 'token',
        password: config.getKafkaApiKey()
      }
    }

    if (config.eventStreamsSecurityEnabled()){
      kafkaClientConfig.ssl = true;
      kafkaClientConfig.sslOptions = {
        ca: [ fs.readFileSync(config.getCertsPath()) ]
      }
    }

    var Consumer = kafka.Consumer,
        client = new kafka.KafkaClient(kafkaClientConfig),
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

    var kafkaClientConfig = {
      kafkaHost: config.getKafkaBrokers()
    };

    if (config.isEventStreams()){
      kafkaClientConfig.sasl = {
        mechanism: 'PLAIN',
        username: 'token',
        password: config.getKafkaApiKey()
      }
    }

    if (config.eventStreamsSecurityEnabled()){
      kafkaClientConfig.ssl = true;
      kafkaClientConfig.sslOptions = {
        ca: [ fs.readFileSync(config.getCertsPath()) ]
      }
    }

    var Consumer = kafka.Consumer,
        client = new kafka.KafkaClient(kafkaClientConfig),
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
