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

    // public produceProblem(p:domain.ShipPosition) {
    //     console.log("In produceProblem");
    //     this.producer.on("error", function(error) {
    //         console.error(error);
    //     });
    //
    //     this.producer.on("ready", function() {
    //         console.log("Producer is ready on " + this.config.getProblemTopicName());
    //         let positionvarAsString = JSON.stringify(p);
    //         console.log("Try to send " + positionvarAsString);
    //         const buffer = new Buffer.from(positionvarAsString);
    //         const produceRequest = [{
    //             topic: this.config.getProblemTopicName(),
    //             messages: [buffer],
    //             partition: 0,
    //             attributes: 0 // control message compression: 0: no compression ,1: GZip, 2: snappy
    //         }];
    //         this.producer.send(produceRequest,(err,data) => {
    //             console.log("In callback received: " + JSON.stringify(data));
    //         });
    //     });
    // }

    public stopProducer(){
        this.producer.close(true, () => {
            console.log("Stop problem producer");
        })
    }
}

// (() => {
//     console.log("###################################");
//     console.log("# Produce problem on boat         #");
//     console.log("###################################");
//     let producer = new ProblemProducer();
//     let problem = new domain.ProblemReport();
//     problem.status = "Issue on boat at sea";
//     problem.containerId = "C_02";
//     problem.shipId = "JimminyCricket";
//     problem.severity = "SEVERE";
//     let probReport = { "shipID": problem.shipId,
//                        "latitude" : problem.latitude,
//                        "longitude" : problem.longitude,
//                        "status" : problem.status,
//                        "ts" : problem.ts }
//     producer.ProblemTopicProducer(problem);
//     // producer.stopProducer();
// })();
