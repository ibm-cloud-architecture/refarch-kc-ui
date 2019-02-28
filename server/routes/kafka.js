"use strict";

class Kafka {

  kafka() {

     var list=new Array;

     var config = require("../config/config.json");

     var options = {
       fromOffset: 'latest'
     };

     console.log("Options set");

     var kafka = require('kafka-node'),
       Consumer = kafka.Consumer,
       client = new kafka.KafkaClient({kafkaHost: config.kafkaBrokers}),
       consumer = new Consumer(
           client,
           [
               { topic: config.problemTopicName, partition: 0 }
           ],
           [
             {
               autoCommit: false
             },
             options =
             {
               fromOffset: 'latest'
             }
           ]
         );

         console.log("kafka properties set");

         consumer.on('message', function (message) {
             console.log("In js consumer file");
             console.log(message.value);
             list.push(message.value);
           });

     consumer.on('error', function (err) {
       console.log("This is the err "+err);
       return err;
     });

     return list;

   }

   kafkaShipPosition() {

      var shiPositionList=new Array;

      var config = require("../config/config.json");

      console.log("Ship topic name "+config.shipTopicName);

      var options = {
        fromOffset: 'latest'
      };

      console.log("Options set");

      var kafka = require('kafka-node'),
        Consumer = kafka.Consumer,
        client = new kafka.KafkaClient({kafkaHost: config.kafkaBrokers}),
        consumer = new Consumer(
            client,
            [
                { topic: config.shipTopicName, partition: 0 }
            ],
            [
              {
                autoCommit: false
              },
              options =
              {
                fromOffset: 'latest'
              }
            ]
          );

          console.log("kafka properties set");

          consumer.on('message', function (message) {
              console.log("In ship position js consumer file");
              console.log(message.value);
              shiPositionList.push(message.value);
            });

      consumer.on('error', function (err) {
        console.log("This is the err"+err);
        return err;
      });

      return shiPositionList;

    }
}
export default Kafka;
