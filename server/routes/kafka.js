"use strict";

class Kafka {



  kafka() {

     var list=new Array;

     var options = {
       fromOffset: 'latest'
     };

     console.log("Options set");

     var kafka = require('kafka-node'),
       Consumer = kafka.Consumer,
       client = new kafka.KafkaClient({kafkaHost: 'kafka1:9092'}),
       consumer = new Consumer(
           client,
           [
               // { topic: 'bluewaterShip', partition: 0 },
               { topic: 'blueProblem', partition: 0 }
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
             // var buf = new Buffer(message.value, "binary");
             // var aProb = JSON.parse(message.value);
             // console.log("This problem is "+ aProb.containerId);
             // lastPosition[aProb.shipId]=aProb;
             // console.log("Printed it"+this.lastPosition[aProb.shipId].shipId);
             // console.log(typeof this.lastPosition[aProb.shipId]);
             // return this.lastPosition[aProb.shipId];
             //Events is a Sequelize Model Object.
             // return Events.create({
             //   issue: decodedMessage.issue,
             //   containerId: decodedMessage.containerId,
             //   shipId: decodedMessage.shipId,
             //   status: decodedMessage.status
             // });
             list.push(message.value);
           });

     consumer.on('error', function (err) {
       console.log("This is the err"+err);
       return err;
     });

     return list;

   }
}
export default Kafka;
