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
        console.log(this.config.getKafkaBrokers());
        let client = new kafka.KafkaClient({
            kafkaHost: this.config.getKafkaBrokers(),
            connectTimeout: 2000, // in ms it takes to wait for a successful connection before moving to the next host
            requestTimeout: 2000,
            autoConnect: true, // automatically connect when KafkaClient is instantiated
            idleConnection: 10000, // allows the broker to disconnect an idle connection from a client 5 min default.
            maxAsyncRequests: 10 // maximum async operations at a time toward the kafka cluster
        });
        this.producer = new Producer(client,{
            requireAcks: 1,    // Configuration for when to consider a message as acknowledged, default 1
            ackTimeoutMs: 100, // The amount of time in milliseconds to wait for all acks before considered, default 100ms
            partitionerType: 2 // Partitioner type (default = 0, random = 1, cyclic = 2, keyed = 3, custom = 4), default 0
        });
    }

    cb(err,data) {
        console.log("In callback received: " + JSON.stringify(data));
     }

    public produceProblem(p:domain.ShipPosition) {
        console.log("In produceProblem");
        this.producer.on("error", function(error) {
            console.error(error);
        });

        this.producer.on("ready", function() {
            console.log("Producer is ready on " + this.config.getProblemTopicName());
            let positionvarAsString = JSON.stringify(p);
            console.log("Try to send " + positionvarAsString);
            const buffer = new Buffer.from(positionvarAsString);
            const produceRequest = [{
                topic: this.config.getProblemTopicName(),
                messages: [buffer],
                partition: 0,
                attributes: 0 // control message compression: 0: no compression ,1: GZip, 2: snappy
            }];
            this.producer.send(produceRequest,(err,data) => {
                console.log("In callback received: " + JSON.stringify(data));
            });
        });
    }

    public stopProducer(){
        this.producer.close(true, () => {
            console.log("Stop problem producer");
        })
    }
}

(() => {
    console.log("###################################");
    console.log("# Produce problem on boat         #");
    console.log("###################################");
    let producer = new ProblemProducer();
    let problem = new domain.ProblemReport();
    problem.status = "Issue on boat at sea";
    problem.containerId = "C_02";
    problem.shipId = "JimminyCricket";
    problem.severity = "SEVERE";
    let probReport = { "shipID": problem.shipId,
                       "latitude" : problem.latitude,
                       "longitude" : problem.longitude,
                       "status" : problem.status,
                       "ts" : problem.ts }
    producer.produceProblem(probReport);
    // producer.stopProducer();
})();
